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

    const lines = modelResponse.split("\n").filter(Boolean);

    // Parse Gemini's response
    const parsed = {
      projectType: lines[0]
        ?.split(":")[1]
        ?.trim()
        ?.replace(/[\*\*\s]/g, ""), // Remove '**' and extra spaces
      features: lines[1]
        ?.split(":")[1]
        ?.split(",")
        .map((f) => f.trim().replace(/[\*\*\s]/g, "")), // Remove '**' and extra spaces
      complexity: lines[2]
        ?.split(":")[1]
        ?.trim()
        ?.replace(/[\*\*\s]/g, ""), // Remove '**' and extra spaces
      timeline:
        lines[3]?.split(":")[1]?.trim() === "Not Specified"
          ? null
          : parseInt(lines[3]?.split(":")[1]),
    };

    // Temporarily bypass the validation check to log parsed result for debugging
    if (
      !parsed.projectType ||
      !Array.isArray(parsed.features) ||
      !parsed.complexity ||
      (parsed.timeline !== null && isNaN(parsed.timeline))
    ) {
      console.warn("Parsed result incomplete:", parsed);
      return res
        .status(400)
        .json({ error: "Failed to extract required fields from response." });
    }

    // If timeline is null, set a default value (e.g., 4 weeks)
    const timelineWeeks = parsed.timeline || 4;

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
