"use client"

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@/components/ui/card"

const sentimentData = [
  { name: "Positive", value: 458, fill: "#10b981" },
  { name: "Neutral", value: 234, fill: "#8b5cf6" },
  { name: "Negative", value: 89, fill: "#ef4444" },
]

const trendData = [
  { date: "Mon", positive: 120, neutral: 80, negative: 20 },
  { date: "Tue", positive: 145, neutral: 75, negative: 30 },
  { date: "Wed", positive: 165, neutral: 95, negative: 35 },
  { date: "Thu", positive: 190, neutral: 110, negative: 40 },
  { date: "Fri", positive: 210, neutral: 130, negative: 25 },
  { date: "Sat", positive: 185, neutral: 120, negative: 45 },
  { date: "Sun", positive: 200, neutral: 140, negative: 35 },
]

export function SentimentChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Sentiment Overview */}
      <Card className="bg-card border-border/50 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={sentimentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Sentiment Trend */}
      <Card className="lg:col-span-2 bg-card border-border/50 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">7-Day Sentiment Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.18 0.04 280)" />
            <XAxis dataKey="date" stroke="oklch(0.65 0 0)" />
            <YAxis stroke="oklch(0.65 0 0)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.12 0.05 280)",
                border: "1px solid oklch(0.18 0.04 280)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="positive" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="neutral" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="negative" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
