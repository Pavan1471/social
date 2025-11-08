"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)

  // Basic validation
  if (!formData.email.trim() || !formData.password.trim()) {
    setError("Please enter both email and password.")
    return
  }

  setIsLoading(true)
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.error || "Invalid email or password")
    }

    if (!data?.token || !data?.user) {
      throw new Error("Invalid response from server. Please try again.")
    }

    // Save token and user info
    localStorage.setItem("token", data.token)
    // Set token in cookies for middleware protection
    document.cookie = `token=${data.token}; path=/; secure; samesite=strict`
    localStorage.setItem("role", data.user.role)
    localStorage.setItem("user", JSON.stringify(data.user))

    // ✅ Redirect only if user role is "store"
    if (data.user.role === "store") {
      router.push("/dashboard")
    } else {
      router.push("/dashboard/custom-form")
    }
  } catch (err: any) {
    setError(err.message || "Something went wrong. Please try again.")
  } finally {
    setIsLoading(false)
  }
}


  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">🔐</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        {/* Login Form */}
        <Card className="bg-card border-border/50 p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center font-medium">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Card>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
