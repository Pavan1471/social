"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">📊</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Hub</h1>
          <p className="text-muted-foreground">Real-time Social Media Intelligence</p>
        </div>

        {/* Call to Action */}
        <div className="space-y-3">
          <Button asChild className="w-full h-11 text-base" size="lg">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-11 text-base bg-transparent" size="lg">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="pt-8 space-y-4">
          <div className="text-sm text-muted-foreground text-center">✨ Features</div>
          <div className="grid gap-3">
            {[
              { icon: "📈", label: "Real-time Analytics" },
              { icon: "💬", label: "Sentiment Analysis" },
              { icon: "🔍", label: "Keyword Tracking" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 text-sm text-foreground bg-card/50 p-3 rounded-lg border border-border/50"
              >
                <span>{feature.icon}</span>
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
