"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: `url("/background.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md space-y-10 bg-white/20 backdrop-blur-xl p-10 rounded-3xl border border-white/30 shadow-2xl">

        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">📊</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white">Analytics Hub</h1>
          <p className="text-white/80 text-md">Real-time Social Media Intelligence</p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Button
            asChild
            size="lg"
            className="w-full bg-primary text-white text-lg py-3 rounded-xl shadow-lg hover:bg-primary/90"
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-white/40 text-white py-3 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30"
          >
            <Link href="/register">Create Account</Link>
          </Button>
        </div>

        {/* Features */}
        <div className="pt-4 space-y-4">
          <div className="text-sm text-white/90 text-center">✨ Features</div>

          <div className="grid gap-3">
            {[
              { icon: "📈", label: "Real-time Analytics" },
              { icon: "💬", label: "Sentiment Analysis" },
              { icon: "🔍", label: "Keyword Tracking" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white"
              >
                <span className="text-lg">{feature.icon}</span>
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
