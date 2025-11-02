const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String },
    age: { type: Number },
    gender: { type: String },
    city: { type: String },
    product: { type: String, required: true },
    category: { type: String },
    purchasePlatform: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    emotion: { type: String },
    satisfactionLevel: { type: String },
    reviewText: { type: String, required: true },
    usageFrequency: { type: String },
    wouldRecommend: { type: Boolean, default: false },
    featuresLiked: [{ type: String }],
    featuresDisliked: [{ type: String }],
    purchaseDate: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
