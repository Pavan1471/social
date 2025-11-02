"use client"

import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"

export default function KeywordsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/keywords/keywords")
        const json = await res.json()
        setData(json)
      } catch {
        setError("Failed to load keyword analytics")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <DashboardSidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Keywords & Customer Feedback
              </h1>
              <p className="text-gray-400 mt-2">
                Live AI-generated insights based on latest customer reviews
              </p>
            </div>

            {loading && <div className="text-center py-24 animate-pulse text-gray-400">🔍 Analyzing keywords...</div>}
            {error && <div className="text-center text-red-400 font-medium">{error}</div>}

            {!loading && data && (
              <>
                {/* Keywords Section */}
                <Card className="bg-white/10 border-none p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">Top Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.top_keywords?.length ? (
                      data.top_keywords.map((kw: any, i: number) => (
                        <span
                          key={i}
                          className={`px-4 py-1 text-sm rounded-full font-medium ${
                            kw.sentiment === "positive"
                              ? "bg-green-500/20 text-green-300"
                              : kw.sentiment === "negative"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          #{kw.word} ({kw.count})
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400">No keywords detected</p>
                    )}
                  </div>
                </Card>

                {/* Common Phrases */}
                <Card className="bg-white/10 border-none p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">Common Phrases</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {data.common_phrases?.length ? (
                      data.common_phrases.map((phrase: string, i: number) => (
                        <li key={i}>{phrase}</li>
                      ))
                    ) : (
                      <p className="text-gray-400">No common phrases available</p>
                    )}
                  </ul>
                </Card>

                {/* Customer Feedback */}
                <Card className="bg-white/10 border-none p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">Customer Feedback</h3>
                  <div className="space-y-3">
                    {data.customer_feedback?.length ? (
                      data.customer_feedback.map((fb: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                        >
                          <span>
                            {fb.sentiment === "positive"
                              ? "😊"
                              : fb.sentiment === "neutral"
                              ? "😐"
                              : "😕"}
                          </span>
                          <div>
                            <p className="font-medium text-gray-100">{fb.author || "Anonymous"}</p>
                            <p className="text-gray-400">{fb.review}</p>
                          </div>
                          <span
                            className={`ml-auto text-xs px-2 py-1 rounded ${
                              fb.sentiment === "positive"
                                ? "bg-green-500/20 text-green-400"
                                : fb.sentiment === "negative"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {fb.sentiment}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No feedback found</p>
                    )}
                  </div>
                </Card>

                {/* Summary */}
                <Card className="bg-white/10 border-none p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-300">AI Summary</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {data.summary || "No summary generated yet."}
                  </p>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
