const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// POST /api/reviews  — Create new feedback
router.post("/", async (req, res) => {
  try {
    const reviewData = req.body;

    if (!reviewData.product || !reviewData.reviewText) {
      return res
        .status(400)
        .json({ error: "Product and review text are required." });
    }

    const newReview = new Review(reviewData);
    await newReview.save();

    res.status(201).json({ message: "✅ Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Server error while saving feedback." });
  }
});

// GET /api/reviews — Fetch all feedback (for dashboard/analytics)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Server error fetching reviews." });
  }
});

module.exports = router;
