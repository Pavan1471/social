"use client"

import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="bg-card border-b border-border/50 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Welcome back to your analytics hub</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="text-foreground border-border/50 bg-transparent">
          🔔
        </Button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent"></div>
      </div>
    </header>
  )
}
