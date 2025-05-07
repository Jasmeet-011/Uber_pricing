// server/services/gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize the Gemini AI client with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = genAI;
