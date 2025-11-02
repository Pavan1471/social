"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AlertCard() {
  return (
    <Card className="bg-destructive/10 border-destructive/30 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-destructive mb-1">Negative Sentiment Alert</h3>
          <p className="text-sm text-foreground mb-2">
            Negative sentiment increased by 15% in the last 24 hours. Review recent comments to identify issues.
          </p>
          <p className="text-xs text-muted-foreground">Affected platforms: Instagram (8), Twitter (5), Facebook (2)</p>
        </div>
        <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent">
          Review Comments
        </Button>
      </div>
    </Card>
  )
}
