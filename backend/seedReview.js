const mongoose = require("mongoose");
const Review = require("./models/Review");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/feedbackDB";

const reviews = [
  {
    customerName: "Ravi Kumar",
    age: 28,
    gender: "Male",
    city: "Hyderabad",
    product: "Noise Cancelling Headphones",
    category: "Electronics",
    purchasePlatform: "Amazon",
    rating: 5,
    emotion: "Happy",
    satisfactionLevel: "Very Satisfied",
    reviewText: "The sound quality is amazing and the noise cancellation is top-notch. Battery lasts long too!",
    usageFrequency: "Daily",
    wouldRecommend: true,
    featuresLiked: ["Sound Quality", "Battery", "Noise Cancellation"],
    featuresDisliked: [],
    purchaseDate: "2025-10-15",
  },
  {
    customerName: "Anjali Sharma",
    age: 24,
    gender: "Female",
    city: "Bangalore",
    product: "Smartwatch Pro X",
    category: "Wearables",
    purchasePlatform: "Flipkart",
    rating: 3,
    emotion: "Neutral",
    satisfactionLevel: "Moderately Satisfied",
    reviewText: "The watch looks great but the step tracking isn’t always accurate. Battery drains quickly.",
    usageFrequency: "Occasionally",
    wouldRecommend: false,
    featuresLiked: ["Design"],
    featuresDisliked: ["Battery", "Tracking"],
    purchaseDate: "2025-09-12",
  },
  {
    customerName: "Vikram Singh",
    age: 31,
    gender: "Male",
    city: "Delhi",
    product: "Wireless Bluetooth Speaker",
    category: "Electronics",
    purchasePlatform: "Amazon",
    rating: 4,
    emotion: "Satisfied",
    satisfactionLevel: "Satisfied",
    reviewText: "The speaker delivers clear sound and deep bass. Portable and easy to use, though slightly heavy.",
    usageFrequency: "Weekly",
    wouldRecommend: true,
    featuresLiked: ["Bass", "Portability"],
    featuresDisliked: ["Weight"],
    purchaseDate: "2025-08-29",
  },
  {
    customerName: "Sneha Patel",
    age: 27,
    gender: "Female",
    city: "Mumbai",
    product: "Air Purifier 3000",
    category: "Home Appliances",
    purchasePlatform: "Croma",
    rating: 2,
    emotion: "Disappointed",
    satisfactionLevel: "Dissatisfied",
    reviewText: "Stopped working after two weeks. Customer support took too long to respond.",
    usageFrequency: "Daily",
    wouldRecommend: false,
    featuresLiked: [],
    featuresDisliked: ["Customer Support", "Durability"],
    purchaseDate: "2025-10-01",
  },
  {
    customerName: "Karan Verma",
    age: 35,
    gender: "Male",
    city: "Chennai",
    product: "Smart LED TV",
    category: "Electronics",
    purchasePlatform: "Reliance Digital",
    rating: 5,
    emotion: "Delighted",
    satisfactionLevel: "Extremely Satisfied",
    reviewText: "Crystal clear display and smooth performance. Netflix and YouTube apps run flawlessly.",
    usageFrequency: "Daily",
    wouldRecommend: true,
    featuresLiked: ["Display", "Performance", "Smart Features"],
    featuresDisliked: [],
    purchaseDate: "2025-10-10",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await Review.deleteMany({});
    await Review.insertMany(reviews);
    console.log("✅ Sample reviews inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting reviews:", err);
    mongoose.connection.close();
  }
}

seed();
