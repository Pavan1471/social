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

      if (!res.ok) throw new Error(data?.error || "Invalid email or password")

      if (!data?.token || !data?.user)
        throw new Error("Invalid response, try again.")

      localStorage.setItem("token", data.token)
      document.cookie = `token=${data.token}; path=/; secure; samesite=strict`
      localStorage.setItem("role", data.user.role)
      localStorage.setItem("user", JSON.stringify(data.user))

      if (data.user.role === "store") router.push("/dashboard")
      else router.push("/dashboard/custom-form")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: 'url("/background.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/20 backdrop-blur-xl border-white/30 p-10 rounded-3xl shadow-2xl">

          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/80 mt-1">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-white/90 font-medium">Email</label>
              <Input
                name="email"
                type="email"
                onChange={handleChange}
                className="bg-white/30 text-white border-white/40 placeholder-white/60"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm text-white/90 font-medium">Password</label>
              <Input
                name="password"
                type="password"
                onChange={handleChange}
                className="bg-white/30 text-white border-white/40 placeholder-white/60"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-300 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-xl font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-white/80 mt-6">
            Don’t have an account?
            <Link href="/register" className="text-white font-semibold ml-1 underline">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
