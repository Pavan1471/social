"use client"

import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ai/analyze")
        const data = await res.json()
        setAnalysis(data)
      } catch (err) {
        setError("Failed to fetch AI analytics")
      } finally {
        setLoading(false)
      }
    }
    fetchAnalysis()
  }, [])

  const COLORS = ["#22c55e", "#facc15", "#ef4444"]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white">
      {/* Sidebar always visible */}
      <DashboardSidebar />

      <div className="flex-1 ml-64 flex flex-col backdrop-blur-sm bg-white/5">
        <DashboardHeader />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered Analytics Dashboard
              </h1>
              <p className="text-gray-400 mt-2 text-sm">
                Real-time sentiment, keyword, and trend insights powered by Gemini AI
              </p>
            </div>

            {/* Loading/Error States */}
            {loading && (
              <div className="text-center py-24 animate-pulse text-gray-400">
                ⏳ Analyzing data...
              </div>
            )}
            {error && (
              <div className="text-center text-red-400 font-medium">{error}</div>
            )}

            {!loading && analysis && (
              <>
                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      label: "Overall Sentiment",
                      value: analysis.overall_sentiment?.toUpperCase() || "N/A",
                      color: "text-blue-400",
                    },
                    {
                      label: "Positive Reviews",
                      value: analysis.sentiment_distribution?.positive ?? 0,
                      color: "text-green-400",
                    },
                    {
                      label: "Negative Reviews",
                      value: analysis.sentiment_distribution?.negative ?? 0,
                      color: "text-red-400",
                    },
                  ].map((stat, i) => (
                    <Card
                      key={i}
                      className="bg-white/10 hover:bg-white/20 border-none shadow-md p-6 rounded-2xl transition-all duration-300"
                    >
                      <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                      <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
                    </Card>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sentiment Pie Chart */}
                  <Card className="bg-white/10 border-none shadow-lg p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">
                      Sentiment Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Positive", value: analysis.sentiment_distribution?.positive },
                            { name: "Neutral", value: analysis.sentiment_distribution?.neutral },
                            { name: "Negative", value: analysis.sentiment_distribution?.negative },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={90}
                          label
                        >
                          {COLORS.map((color, i) => (
                            <Cell key={i} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#1f2937", borderRadius: 8, border: "none" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Weekly Trend Line Chart */}
                  <Card className="bg-white/10 border-none shadow-lg p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">
                      Weekly Sentiment Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={analysis.trend || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ background: "#1f2937", borderRadius: 8 }} />
                        <Legend />
                        <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} />
                        <Line type="monotone" dataKey="neutral" stroke="#facc15" strokeWidth={2} />
                        <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Keywords + Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Keywords */}
                  <Card className="bg-white/10 border-none shadow-lg p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">
                      Top Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.top_keywords?.length ? (
                        analysis.top_keywords.map((kw: any, i: number) => (
                          <span
                            key={i}
                            className={`px-3 py-1 text-sm rounded-full ${
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
                        <p className="text-gray-400">No keywords available</p>
                      )}
                    </div>
                  </Card>

                  {/* Insights */}
                  <Card className="bg-white/10 border-none shadow-lg p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-blue-300">
                      Customer Insights
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {analysis.insights || "No insights generated yet."}
                    </p>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
