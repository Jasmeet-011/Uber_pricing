// server/routes/analyze.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const calculatePricing = require("../services/pricing");
require("dotenv").config();

// Gemini API endpoint with your API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

router.post("/", async (req, res) => {
  const { description } = req.body;
  console.log("API called with description:", description);

  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Description is required." });
  }

  try {
    const prompt = `
Extract the following details from this project description:
- Project Type
- Features (comma-separated)
- Complexity (Low/Medium/High)
- Timeline (weeks)

Description:
"${description}"
    `;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const modelResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("Gemini response:", modelResponse);

    if (!modelResponse) {
      return res
        .status(500)
        .json({ error: "Invalid response from Gemini API" });
    }

    const lines = modelResponse
      .split("\n")
      .filter(Boolean)
      .map((line) => line.replace(/[*`_]/g, "").trim());

    console.log("Cleaned lines from Gemini response:", lines);

    const getField = (label) =>
      lines
        .find((l) => l.toLowerCase().startsWith(label.toLowerCase()))
        ?.split(":")[1]
        ?.trim();

    const featuresLine = getField("Features");
    const features = featuresLine
      ? featuresLine.split(",").map((f) => f.trim())
      : [];

    const parsed = {
      projectType: getField("Project Type"),
      features,
      complexity: getField("Complexity"),
      timeline: getField("Timeline"),
    };

    console.log("Parsed result:", parsed);

    // Normalize timeline
    const timelineText = parsed.timeline?.toLowerCase() || "";
    const timelineWeeks =
      timelineText.includes("not specified") || isNaN(parseInt(parsed.timeline))
        ? 4
        : parseInt(parsed.timeline);

    // Validate required fields
    if (
      !parsed.projectType ||
      !Array.isArray(parsed.features) ||
      !parsed.features.length ||
      !parsed.complexity
    ) {
      console.warn("Parsed result incomplete:", parsed);
      return res
        .status(400)
        .json({ error: "Failed to extract required fields from response." });
    }

    const pricing = calculatePricing(
      parsed.features.length,
      parsed.complexity,
      timelineWeeks
    );

    res.json({
      human_hours: pricing.humanHours,
      human_cost: parseFloat(pricing.humanCost.slice(1)),
      ai_cost: parseFloat(pricing.aiCost.slice(1)),
      complexity: parsed.complexity,
      complexity_surcharge: parseFloat(pricing.surcharge.replace("%", "")),
      total_cost: parseFloat(pricing.totalCost.slice(1)),
    });
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    res.status(500).send("Gemini API request failed");
  }
});

module.exports = router;
