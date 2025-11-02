const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const genAI = require("../utils/geminiClient");

router.get("/analyze", async (req, res) => {
  try {
    const reviews = await Review.find().limit(200);
    const reviewTexts = reviews.map((r) => r.reviewText).join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are a customer sentiment analytics assistant. Analyze the following customer reviews and return **ONLY** valid JSON (no markdown, no code blocks, no comments).

    Generate insights and data suitable for dashboard visualization.

    **Return in this exact JSON format:**

    {
      "overall_sentiment": "positive" | "neutral" | "negative",
      "sentiment_distribution": {
        "positive": <number>,
        "neutral": <number>,
        "negative": <number>
      },
      "trend": [
        { "date": "Mon", "positive": <number>, "neutral": <number>, "negative": <number> },
        { "date": "Tue", "positive": <number>, "neutral": <number>, "negative": <number> },
        { "date": "Wed", "positive": <number>, "neutral": <number>, "negative": <number> },
        { "date": "Thu", "positive": <number>, "neutral": <number>, "negative": <number> },
        { "date": "Fri", "positive": <number>, "neutral": <number>, "negative": <number> },
        { "date": "Sat", "positive": <number>, "neutral": <number>, "negative": <number> },
        { "date": "Sun", "positive": <number>, "neutral": <number>, "negative": <number> }
      ],
      "top_keywords": [
        { "word": "battery", "count": <number>, "sentiment": "negative" },
        { "word": "sound", "count": <number>, "sentiment": "positive" },
        { "word": "delivery", "count": <number>, "sentiment": "neutral" }
      ],
      "pie_chart_data": [
        { "name": "Positive", "value": <number> },
        { "name": "Neutral", "value": <number> },
        { "name": "Negative", "value": <number> }
      ],
      "bar_chart_data": [
        { "day": "Mon", "Positive": <number>, "Neutral": <number>, "Negative": <number> },
        { "day": "Tue", "Positive": <number>, "Neutral": <number>, "Negative": <number> },
        { "day": "Wed", "Positive": <number>, "Neutral": <number>, "Negative": <number> },
        { "day": "Thu", "Positive": <number>, "Neutral": <number>, "Negative": <number> },
        { "day": "Fri", "Positive": <number>, "Neutral": <number>, "Negative": <number> },
        { "day": "Sat", "Positive": <number>, "Neutral": <number>, "Negative": <number> },
        { "day": "Sun", "Positive": <number>, "Neutral": <number>, "Negative": <number> }
      ],
      "word_cloud_data": [
        { "text": "battery", "value": <number> },
        { "text": "sound", "value": <number> },
        { "text": "quality", "value": <number> }
      ],
      "insights": "Summarize key findings: what customers liked, disliked, and suggested improvements."
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
    } catch {
      analysis = { error: "Invalid JSON format from LLM", raw: text };
    }

    res.json(analysis);
  } catch (error) {
    console.error("Gemini analysis error:", error);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

module.exports = router;
