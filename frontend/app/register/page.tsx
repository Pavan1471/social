"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "Default Store",
    role: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.role) {
      setError("Please select a role.")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Registration failed")

      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessClose = () => {
    setIsSuccess(false)
    router.push("/login")
  }

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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* MAIN REGISTER CARD */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/20 backdrop-blur-xl border-white/30 p-8 rounded-3xl shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white">Create Account</h1>
            <p className="text-white/80">Start your journey today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            <div>
              <label className="text-sm text-white/90 font-medium">Full Name</label>
              <Input
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white/30 text-white border-white/40 placeholder-white/60"
              />
            </div>

            <div>
              <label className="text-sm text-white/90 font-medium">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white/30 text-white border-white/40 placeholder-white/60"
              />
            </div>

            <div>
              <label className="text-sm text-white/90 font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white/30 text-white border-white/40 rounded-md focus:ring-white"
              >
                <option value="" className="text-black">Select Role</option>
                <option value="store" className="text-black">Store</option>
                <option value="customer" className="text-black">Customer</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-white/90 font-medium">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-white/30 text-white border-white/40 placeholder-white/60"
              />
            </div>

            {error && <p className="text-red-300 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-white/80 mt-6">
            Already have an account?
            <Link href="/login" className="underline ml-1 text-white font-semibold">
              Sign in
            </Link>
          </p>

        </Card>
      </div>

      {/* SUCCESS MODAL */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl p-6 rounded-2xl w-[90%] max-w-sm text-center text-white">
            <h2 className="text-xl font-semibold mb-2">🎉 Registration Successful!</h2>
            <p className="text-white/80 mb-6">Your account has been created.</p>

            <Button
              onClick={handleSuccessClose}
              className="w-full bg-primary text-white font-semibold py-2 rounded-xl"
            >
              Go to Login
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
