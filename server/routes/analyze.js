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

  if (!description || description.trim() === "") {
    return res.status(400).json({ error: "Description is required." });
  }

  try {
    // Prompt sent to Gemini to extract relevant details
    const prompt = `
Extract the following details from this project description:
- Project Type
- Features (comma-separated)
- Complexity (Low/Medium/High)
- Timeline (weeks)

Description:
"${description}"
    `;

    // Send prompt to Gemini API
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

    // Extract the response text from Gemini
    const modelResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Log Gemini response to debug
    console.log("Gemini response:", modelResponse);

    if (!modelResponse) {
      return res
        .status(500)
        .json({ error: "Invalid response from Gemini API" });
    }

    const lines = modelResponse
      .split("\n")
      .filter(Boolean)
      .map((line) => line.replace(/[*\s**]/g, "").trim()); // Clean up the markdown and bullet points

    console.log("Cleaned lines from Gemini response:", lines);

    // Parse Gemini's response with more precise splitting
    const parsed = {
      projectType: lines[1]?.split(":")[1]?.trim(),
      features: lines[2]
        ?.split(":")[1]
        ?.split(",")
        .map((f) => f.trim()),
      complexity: lines[3]?.split(":")[1]?.trim(),
      timeline: lines[4]?.split(":")[1]?.trim(),
    };

    // Log parsed result to see the cleaned values
    console.log("Parsed result:", parsed);

    // Check if any of the fields are missing or incorrect
    if (
      !parsed.projectType ||
      !Array.isArray(parsed.features) ||
      !parsed.features.length ||
      !parsed.complexity ||
      (parsed.timeline !== "Not Specified" && isNaN(parseInt(parsed.timeline)))
    ) {
      console.warn("Parsed result incomplete:", parsed);
      return res
        .status(400)
        .json({ error: "Failed to extract required fields from response." });
    }

    // Handle the case where the timeline is missing or invalid
    const timelineWeeks =
      parsed.timeline === "Not Specified" ? 4 : parseInt(parsed.timeline);

    // Calculate pricing based on extracted data
    const pricing = calculatePricing(
      parsed.features.length,
      parsed.complexity,
      timelineWeeks
    );

    // Return pricing response in the correct structure
    res.json({
      human_hours: pricing.humanHours,
      human_cost: parseFloat(pricing.humanCost.slice(1)), // Removing the "$" sign
      ai_cost: parseFloat(pricing.aiCost.slice(1)), // Removing the "$" sign
      complexity: parsed.complexity,
      complexity_surcharge: parseFloat(pricing.surcharge.replace("%", "")), // Converting to percentage
      total_cost: parseFloat(pricing.totalCost.slice(1)), // Removing the "$" sign
    });
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    res.status(500).send("Gemini API request failed");
  }
});

module.exports = router;
