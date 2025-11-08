const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const genAI = require("../utils/geminiClient");

router.get("/keywords", async (req, res) => {
  try {
    const reviews = await Review.find().limit(200);
    const reviewTexts = reviews.map(r => r.reviewText).join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an AI analytics assistant. 
    Analyze the following customer reviews and return ONLY valid JSON (no markdown).

    Required JSON format:
    {
      "top_keywords": [
        { "word": "delivery", "count": <number>, "sentiment": "positive/neutral/negative" },
        { "word": "quality", "count": <number>, "sentiment": "positive/neutral/negative" }
      ],
      "common_phrases": ["fast delivery", "bad battery", "excellent sound quality"],
      "customer_feedback": [
        { "author": "customerName", "review": "string", "sentiment": "positive/neutral/negative" }
      ],
      "summary": "Brief summary of what customers liked, disliked, and suggested."
    }

    Reviews:
    ${reviewTexts || "No reviews available"}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let analysis;
    try {
      const cleanText = text.replace(/```json|```/g, "").trim();
      analysis = JSON.parse(cleanText);
    } catch (e) {
      analysis = { error: "Invalid JSON from AI", raw: text };
    }

    res.json(analysis);
  } catch (err) {
    console.error("Keyword Analysis Error:", err);
    res.status(500).json({ error: "AI keyword analysis failed" });
  }
});

module.exports = router;
