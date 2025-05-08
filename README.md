📦 AI-Powered Uber-Style Pricing Engine
A full-stack AI pricing engine that uses natural language project descriptions to generate real-time cost estimates. Built with React, Vite, Node.js, and Google's Gemini LLM API — designed with an Uber-style UX in mind.

🎯 Features
🧠 AI-Powered Parsing: Uses Google Gemini API to extract project type, features, complexity, and timeline from plain text.

💰 Dynamic Pricing Logic: Estimates both human and AI agent costs based on extracted complexity and scope.

⚡ Real-Time Feedback: Users see cost estimates update instantly as they describe or edit their project.

📱 Uber-style UI/UX: Clean, responsive design inspired by the Uber platform.

📊 Cost Breakdown: Detailed output of human hours, AI cost, complexity surcharges, and total price.

🛠️ Tech Stack
Frontend	Backend	AI & APIs
React + Vite	Node.js + Express	Google Gemini LLM API
Tailwind CSS + ShadCN UI	CORS, dotenv, axios	Cost calculation service logic

📁 Project Structure
Uber_pricing/
├── server/                  # Express backend
│   ├── routes/              # /analyze endpoint using Gemini API
│   ├── services/            # Pricing logic
│   └── .env                 # API keys and frontend origin
├── uber-pricing-vision/    # React + Vite frontend
│   ├── components/          # Reusable UI components
│   ├── pages/Index.tsx     # Main page
│   └── apiService.ts       # Handles backend API calls
🧪 Example Input
"A mobile app with login, chat, and notifications. Completion is expected in 3 weeks."

→ Extracted:

Project Type: Mobile App

Features: Login, Chat, Notifications

Complexity: Low

Timeline: 3 weeks

→ Estimated Cost:
💼 Human Hours: 60
🤖 AI Cost: $120
⚙️ Complexity Surcharge: 0%
💵 Total: $1,200

📦 Setup & Development
🔧 1. Clone the Repo
```bash
git clone https://github.com/Jasmeet-011/Uber_pricing.git
cd Uber_pricing
```
🔧 2. Backend Setup (/server)
```bash
cd server
npm install
```
# Create .env file:
# GEMINI_API_KEY=your_gemini_api_key
# FRONTEND_ORIGIN=http://localhost:3000
```npm start```
🔧 3. Frontend Setup (/uber-pricing-vision)
```bash

cd ../uber-pricing-vision
npm install
```
# .env
# VITE_BACKEND_URL=http://localhost:5000
npm run dev
🌐 Deployment Guide
🚀 Frontend on Vercel
Push uber-pricing-vision to GitHub

Go to vercel.com

Import project → Set env VITE_BACKEND_URL=https://your-backend.onrender.com

Deploy!

🚀 Backend on Render
Push server folder as its own repo (or mono-repo root)

Go to render.com

New Web Service → Set env vars:

GEMINI_API_KEY

FRONTEND_ORIGIN=https://your-vercel-url.vercel.app

Deploy!

💡 Future Enhancements
Authentication for API requests

Support for multiple pricing models (hourly vs fixed)

Admin dashboard for tracking quote history

Downloadable quotes (PDF)

🧑‍💻 Author
Jasmeet Singh
🛠 Built for a technical assessment
🌐 LinkedIn

📄 License
MIT License — feel free to fork and build on it!
