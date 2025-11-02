"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function KeywordForm() {
  const [brandName, setBrandName] = useState("")
  const [keywords, setKeywords] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Keywords submitted for analysis!")
      setBrandName("")
      setKeywords("")
    }, 1000)
  }

  return (
    <Card className="bg-card border-border/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Add Keywords for Analysis</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="brand" className="text-sm font-medium text-foreground">
            Brand/Store Name
          </label>
          <Input
            id="brand"
            placeholder="Your Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="keywords" className="text-sm font-medium text-foreground">
            Keywords to Track (comma-separated)
          </label>
          <textarea
            id="keywords"
            placeholder="e.g., product quality, fast shipping, customer service"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border/50 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Analyzing..." : "Start Analysis"}
        </Button>
      </form>
    </Card>
  )
}
