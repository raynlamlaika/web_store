"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

type AdminContextType = {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (username: string, password: string) => {
    // In a real app, this would be an API call to validate credentials
    // For demo purposes, we'll use a hardcoded admin/admin123
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin_token", "demo_token_12345")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    setIsAuthenticated(false)
  }

  return <AdminContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
