"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function AnalyticsFilters() {
  const [dateRange, setDateRange] = useState("7days")
  const [platforms, setPlatforms] = useState<string[]>(["instagram", "facebook", "twitter"])

  const platformOptions = [
    { id: "facebook", label: "Facebook", icon: "f" },
    { id: "instagram", label: "Instagram", icon: "i" },
    { id: "twitter", label: "Twitter/X", icon: "x" },
  ]

  const dateRanges = [
    { id: "24h", label: "Last 24h" },
    { id: "7days", label: "Last 7 days" },
    { id: "30days", label: "Last 30 days" },
    { id: "90days", label: "Last 90 days" },
  ]

  const togglePlatform = (platformId: string) => {
    setPlatforms((prev) => (prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]))
  }

  return (
    <Card className="bg-card border-border/50 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Date Range</h3>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <Button
                key={range.id}
                variant={dateRange === range.id ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange(range.id)}
                className={dateRange === range.id ? "bg-primary text-primary-foreground" : "border-border/50"}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {platformOptions.map((platform) => (
              <Button
                key={platform.id}
                variant={platforms.includes(platform.id) ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform(platform.id)}
                className={platforms.includes(platform.id) ? "bg-primary text-primary-foreground" : "border-border/50"}
              >
                {platform.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
