"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function DashboardHeader() {
  const [name, setName] = useState<string>("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user")
      if (raw) {
        const user = JSON.parse(raw)
        const userName = user?.name ?? user?.fullName ?? user?.firstName ?? user?.username
        if (userName) setName(userName)
      }
    } catch (e) {
      // ignore parse errors
    }
  }, [])

  const firstLetter = name ? name.charAt(0).toUpperCase() : "?"

  return (
    <header className="bg-card border-b border-border/50 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Welcome back to your analytics hub</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
          {firstLetter}
        </div>
      </div>
    </header>
  )
}
