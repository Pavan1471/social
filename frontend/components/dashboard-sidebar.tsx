"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/reviews", label: "Reviews", icon: "⭐" },
  { href: "/dashboard/keywords", label: "Keywords", icon: "🔍" },
  { href: "/dashboard/custom-form", label: "Form", icon: "📝" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [name, setName] = useState<string>("John Doe")
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user")
      if (raw) {
        const user = JSON.parse(raw)
        const userName = user?.name ?? user?.fullName ?? user?.firstName ?? user?.username
        if (userName) setName(userName)
      }
      const storedRole = localStorage.getItem("role")
      if (storedRole) setRole(storedRole)
    } catch (e) {
      // ignore parse errors
    }
  }, [])

  const visibleMenuItems =
    role === "customer"
      ? menuItems.filter((m) => m.href === "/dashboard/custom-form")
      : menuItems

  // Get first letter of name
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?"

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold">📊</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Analytics</h1>
            <p className="text-xs text-muted-foreground">Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {visibleMenuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/30",
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
            {firstLetter}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{name}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full text-sm bg-transparent"
          onClick={() => {
            localStorage.removeItem("user")
            window.location.href = "/"
          }}
        >
          Logout
        </Button>
      </div>
    </aside>
  )
}
