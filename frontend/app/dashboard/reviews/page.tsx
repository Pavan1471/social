"use client"

import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 6 // change this number to control items per page

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reviews")
        const data = await res.json()
        setReviews(data)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }
    fetchReviews()
  }, [])

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview)
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  return (
    <div className="flex bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Customer Reviews</h1>

            {reviews.length === 0 ? (
              <p className="text-center text-muted-foreground">No reviews available.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentReviews.map((review: any) => (
                    <Card
                      key={review._id}
                      className="p-5 shadow-sm border hover:shadow-md transition rounded-2xl"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-lg">{review.customerName || "Anonymous"}</h2>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-2 italic">
                        "{review.reviewText}"
                      </p>

                      <div className="text-xs text-gray-500 space-y-1">
                        <p>
                          <strong>Product:</strong> {review.product}
                        </p>
                        <p>
                          <strong>Category:</strong> {review.category || "—"}
                        </p>
                        <p>
                          <strong>City:</strong> {review.city || "—"}
                        </p>
                        <p>
                          <strong>Platform:</strong> {review.purchasePlatform || "—"}
                        </p>
                        <p>
                          <strong>Recommendation:</strong>{" "}
                          {review.wouldRecommend ? "✅ Yes" : "❌ No"}
                        </p>
                        {review.featuresLiked?.length > 0 && (
                          <p>
                            <strong>Liked:</strong> {review.featuresLiked.join(", ")}
                          </p>
                        )}
                        {review.featuresDisliked?.length > 0 && (
                          <p>
                            <strong>Disliked:</strong> {review.featuresDisliked.join(", ")}
                          </p>
                        )}
                        <p className="text-gray-400 text-right text-[10px] mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                  <Button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="rounded-full"
                  >
                    Previous
                  </Button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="rounded-full"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
