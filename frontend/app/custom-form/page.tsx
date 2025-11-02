"use client"

import { useState } from "react"

export default function DetailedFeedbackForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    age: "",
    gender: "",
    city: "",
    product: "",
    category: "",
    purchasePlatform: "",
    rating: 0,
    emotion: "",
    satisfactionLevel: "",
    reviewText: "",
    usageFrequency: "",
    wouldRecommend: false,
    featuresLiked: [] as string[],
    featuresDisliked: [] as string[],
    purchaseDate: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // ADD: local submissions to show dashboard updates immediately
  const [submissions, setSubmissions] = useState<typeof formData[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    const { name, value, type } = target
    const checked = (target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleMultiSelect = (type: "liked" | "disliked", feature: string) => {
    const key = type === "liked" ? "featuresLiked" : "featuresDisliked"
    setFormData((prev) => {
      const updated = prev[key].includes(feature)
        ? prev[key].filter((f) => f !== feature)
        : [...prev[key], feature]
      return { ...prev, [key]: updated }
    })
  }

  // REPLACE: handleSubmit - attempt network POST, fallback to local save on failure
  const clearForm = () => {
    setFormData({
      customerName: "",
      age: "",
      gender: "",
      city: "",
      product: "",
      category: "",
      purchasePlatform: "",
      rating: 0,
      emotion: "",
      satisfactionLevel: "",
      reviewText: "",
      usageFrequency: "",
      wouldRecommend: false,
      featuresLiked: [] as string[],
      featuresDisliked: [] as string[],
      purchaseDate: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // basic client-side validation
    if (!formData.product || !formData.reviewText) {
      alert("Please fill required fields: Product Name and Review.")
      return
    }

    setIsSubmitting(true)

    // prepare payload (ensure rating is a number)
    const payload = { ...formData, rating: Number(formData.rating) }

    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        // Server accepted - optionally read response
        try {
          const data = await res.json().catch(() => null)
          setSubmissions((s) => [payload, ...s])
          clearForm()
          alert("✅ Feedback submitted successfully!")
        } catch {
          // still treat as success
          setSubmissions((s) => [payload, ...s])
          clearForm()
          alert("✅ Feedback submitted successfully!")
        }
      } else {
        // Server responded with error - fallback to local save
        const txt = await res.text().catch(() => "")
        console.warn("Server error:", txt || res.status)
        setSubmissions((s) => [payload, ...s])
        clearForm()
        alert("⚠️ Server returned an error. Feedback saved locally.")
      }
    } catch (err) {
      // Network failure - fallback to local save
      console.error("Network error:", err)
      setSubmissions((s) => [payload, ...s])
      clearForm()
      alert("⚠️ Network issue. Feedback saved locally.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Customer Feedback Form 💬
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Your feedback helps us understand trends, satisfaction, and improvement areas.
        </p>

        

     

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Inputs */}
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Your Name"
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500 col-span-2"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Product Category (Ex: Clothing)"
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="purchasePlatform"
            value={formData.purchasePlatform}
            onChange={handleChange}
            placeholder="Where did you buy? (e.g., Amazon, Instagram)"
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500"
          />

          {/* Rating */}
          <div className="col-span-2 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setFormData({ ...formData, rating: r })}
                className={`text-3xl ${
                  formData.rating >= r ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Emotion */}
          <div className="col-span-2 flex justify-center gap-4">
            {["😍", "😊", "😐", "😞", "😡"].map((emoji, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setFormData({ ...formData, emotion: emoji })}
                className={`text-4xl transition-transform ${
                  formData.emotion === emoji ? "scale-125" : "scale-100"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Satisfaction Level */}
          <select
            name="satisfactionLevel"
            value={formData.satisfactionLevel}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500 col-span-2"
          >
            <option value="">Satisfaction Level</option>
            <option>Very Satisfied</option>
            <option>Satisfied</option>
            <option>Neutral</option>
            <option>Dissatisfied</option>
            <option>Very Dissatisfied</option>
          </select>

          {/* Usage Frequency */}
          <select
            name="usageFrequency"
            value={formData.usageFrequency}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500 col-span-2"
          >
            <option value="">Usage Frequency</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Rarely</option>
          </select>

          {/* Features Liked */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Features You Liked:</label>
            <div className="flex flex-wrap gap-3 mt-1">
              {["Quality", "Design", "Price", "Fit", "Delivery", "Support"].map((f) => (
                <label key={f} className="flex items-center gap-1 text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.featuresLiked.includes(f)}
                    onChange={() => handleMultiSelect("liked", f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Features Disliked */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Features You Disliked:</label>
            <div className="flex flex-wrap gap-3 mt-1">
              {["Quality", "Design", "Price", "Fit", "Delivery", "Support"].map((f) => (
                <label key={f} className="flex items-center gap-1 text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.featuresDisliked.includes(f)}
                    onChange={() => handleMultiSelect("disliked", f)}
                  />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Review */}
          <textarea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            placeholder="Write your review here..."
            rows={4}
            required
            className="border rounded-lg px-3 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-indigo-500 col-span-2"
          />

          {/* Recommendation */}
          <label className="flex items-center gap-2 col-span-2 text-gray-700">
            <input
              type="checkbox"
              name="wouldRecommend"
              checked={formData.wouldRecommend}
              onChange={handleChange}
            />
            Would you recommend this product to others?
          </label>

          {/* Purchase Date */}
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 col-span-2"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition-all col-span-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  )
}
