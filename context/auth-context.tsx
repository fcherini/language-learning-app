"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

interface User {
  _id: string
  name: string
  email: string
  settings: {
    nativeLanguage: string
    targetLanguage: string
    autoPlayAudio: boolean
    dailyGoal: number
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          // Set default auth header
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`

          // Fetch user profile
          const { data } = await api.get("/api/users/profile")
          setUser(data)
        } catch (error) {
          console.error("Auth check error:", error)
          localStorage.removeItem("token")
          delete api.defaults.headers.common["Authorization"]
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/api/users/login", { email, password })

    // Save token to localStorage
    localStorage.setItem("token", data.token)

    // Set default auth header
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

    // Set user
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const { data } = await api.post("/api/users/register", { name, email, password })

    // Save token to localStorage
    localStorage.setItem("token", data.token)

    // Set default auth header
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

    // Set user
    setUser(data.user)
  }

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token")

    // Remove auth header
    delete api.defaults.headers.common["Authorization"]

    // Clear user
    setUser(null)

    // Redirect to login
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

