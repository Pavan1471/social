"use client"

import { useEffect, useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SocialAnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/api/ai/analyze")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error fetching analysis:", err))
      .finally(() => setLoading(false))
  }, [])

  const COLORS = ["#22c55e", "#eab308", "#ef4444"]
  const pieData = [
    { name: "Positive", value: data?.sentiment_distribution?.positive || 0 },
    { name: "Neutral", value: data?.sentiment_distribution?.neutral || 0 },
    { name: "Negative", value: data?.sentiment_distribution?.negative || 0 },
  ]

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar always visible */}
      <DashboardSidebar />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Social Media Analytics
              </h1>
              <p className="text-muted-foreground">
                Real-time sentiment analysis across all platforms
              </p>
            </div>

            {/* Show loading spinner inside content area */}
            {loading ? (
              <div className="flex justify-center items-center h-[60vh]">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                  <p className="mt-4 text-muted-foreground text-lg font-medium">
                    Analyzing data...
                  </p>
                </div>
              </div>
            ) : !data ? (
              <div className="text-center text-red-500 font-medium mt-10">
                Failed to load analytics
              </div>
            ) : (
              <>
                {/* Overall Sentiment */}
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle>Overall Sentiment</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center">
                      <h2 className="text-5xl font-extrabold text-primary">
                        {data.overall_sentiment?.toUpperCase()}
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        Overall sentiment from recent reviews
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 h-64">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                          >
                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Sentiment Trend */}
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle>Weekly Sentiment Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer>
                      <LineChart data={data.trend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="positive"
                          stroke="#22c55e"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="neutral"
                          stroke="#eab308"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="negative"
                          stroke="#ef4444"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Top Keywords */}
                <Card className="shadow-md rounded-2xl">
                  <CardHeader>
                    <CardTitle>Top Keywords</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    {data.top_keywords?.length > 0 ? (
                      data.top_keywords.map((kw: any, idx: number) => (
                        <span
                          key={idx}
                          className={`px-4 py-2 text-sm font-medium rounded-full shadow-sm ${
                            kw.sentiment === "positive"
                              ? "bg-green-100 text-green-800"
                              : kw.sentiment === "negative"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {kw.word} ({kw.count})
                        </span>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No keywords found
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Insights */}
                <Card className="shadow-md rounded-2xl bg-muted/30">
                  <CardHeader>
                    <CardTitle>AI Insights Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed text-foreground">
                      {data.insights}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
