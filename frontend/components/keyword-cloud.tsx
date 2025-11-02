"use client"

import { Card } from "@/components/ui/card"

const keywords = [
  { word: "product", count: 245, sentiment: "positive" },
  { word: "shipping", count: 189, sentiment: "neutral" },
  { word: "quality", count: 178, sentiment: "positive" },
  { word: "customer service", count: 156, sentiment: "positive" },
  { word: "price", count: 145, sentiment: "neutral" },
  { word: "design", count: 132, sentiment: "positive" },
  { word: "delivery", count: 121, sentiment: "neutral" },
  { word: "style", count: 98, sentiment: "positive" },
  { word: "size", count: 87, sentiment: "neutral" },
  { word: "experience", count: 76, sentiment: "positive" },
]

export function KeywordCloud() {
  return (
    <Card className="bg-card border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Trending Keywords</h3>
      <div className="flex flex-wrap gap-3">
        {keywords.map((item, index) => {
          const size = Math.min(Math.max(item.count / 30, 0.8), 1.6)
          const color =
            item.sentiment === "positive" ? "bg-primary/20 text-primary" : "bg-muted/30 text-muted-foreground"
          return (
            <div
              key={index}
              className={`px-3 py-1 rounded-full ${color} border border-border/50 transition-all hover:scale-110 cursor-pointer`}
              style={{ fontSize: `${size}rem` }}
            >
              {item.word}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
