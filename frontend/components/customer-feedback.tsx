"use client"

import { Card } from "@/components/ui/card"

const feedbackList = [
  {
    id: 1,
    author: "Sarah M.",
    platform: "Instagram",
    text: "Just received my order! The quality is amazing, exactly as described. Will definitely shop again!",
    sentiment: "positive",
    date: "2 hours ago",
    likes: 45,
  },
  {
    id: 2,
    author: "John K.",
    platform: "Facebook",
    text: "Ordered on Monday, still no shipping update. A little frustrated with the process.",
    sentiment: "negative",
    date: "4 hours ago",
    likes: 12,
  },
  {
    id: 3,
    author: "Emma L.",
    platform: "Twitter",
    text: "Customer service was super helpful when I had a question. Great experience overall!",
    sentiment: "positive",
    date: "6 hours ago",
    likes: 78,
  },
  {
    id: 4,
    author: "Michael T.",
    platform: "Instagram",
    text: "Love the new collection! The design is modern and fits perfectly.",
    sentiment: "positive",
    date: "8 hours ago",
    likes: 156,
  },
  {
    id: 5,
    author: "Rachel P.",
    platform: "Facebook",
    text: "The size guide was confusing and I ordered the wrong size. Hoping returns are easy.",
    sentiment: "neutral",
    date: "10 hours ago",
    likes: 8,
  },
]

export function CustomerFeedback() {
  return (
    <Card className="bg-card border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Customer Feedback</h3>
      <div className="space-y-3">
        {feedbackList.map((feedback) => {
          const sentimentColors = {
            positive: { bg: "bg-green-500/10", text: "text-green-500", label: "Positive" },
            negative: { bg: "bg-red-500/10", text: "text-red-500", label: "Negative" },
            neutral: { bg: "bg-yellow-500/10", text: "text-yellow-500", label: "Neutral" },
          }
          const colors = sentimentColors[feedback.sentiment as keyof typeof sentimentColors]

          return (
            <div
              key={feedback.id}
              className="p-4 bg-input/30 rounded-lg border border-border/50 hover:border-border/80 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{feedback.author}</p>
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {feedback.platform}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{feedback.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${colors.bg} ${colors.text}`}>
                  {colors.label}
                </span>
              </div>
              <p className="text-sm text-foreground mb-3">{feedback.text}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <button className="hover:text-foreground transition-colors">👍 {feedback.likes}</button>
                <button className="hover:text-foreground transition-colors">💬 Reply</button>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
