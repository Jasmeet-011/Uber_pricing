// server/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");

const app = express();
console.log("CORS Origin:", process.env.FRONTEND_ORIGIN); // DEBUG

// Allow cross-origin requests from your front-end client
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));

// Middleware to parse JSON bodies
app.use(express.json());

// Define the routes
app.use("/analyze", analyzeRoute);

// Health check route to verify the server is running
app.get("/", (req, res) => res.send("AI Pricing Backend Running"));

// Start the server on port 5000
app.listen(5000, () => console.log("Server started on port 5000"));
