import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { extractSkills } from "./geminiService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check (important for debugging)
app.get("/", (req, res) => {
  res.send("AI Resume Screening Backend is running");
});

// AI skill extraction endpoint
app.post("/api/extract-skills", async (req, res) => {
  try {
    console.log("API KEY LOADED:", !!process.env.GEMINI_API_KEY);
    const { jobText, resumeText } = req.body;

    if (!jobText || !resumeText) {
      return res.status(400).json({
        error: "Job description and resume text are required",
      });
    }

    const aiResult = await extractSkills(jobText, resumeText);

    res.json(aiResult);
  } catch (error) {
    console.error("Gemini Error:", error.message);

    res.status(500).json({
      error: "AI processing failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


