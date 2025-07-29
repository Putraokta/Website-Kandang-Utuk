"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type User, ROLE_PERMISSIONS } from "@/types/user"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  hasPermission: (resource: string, action: string) => boolean
  isRole: (role: string | string[]) => boolean
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone: string
  role: "buyer" | "farmer"
  farmName?: string
  farmSize?: string
  businessLicense?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      if (token) {
        // Simulate API call to verify token and get user data
        const userData = await simulateGetUserData(token)
        if (userData) {
          setUser(userData)
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth-token")
    } finally {
      setIsLoading(false)
    }
  }

  const simulateGetUserData = async (token: string): Promise<User | null> => {
    // Simulate API call - in real app, this would be an actual API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock user data based on email from localStorage
    const mockUserEmail = localStorage.getItem("user-email")
    if (!mockUserEmail) return null

    const mockUsers: Record<string, User> = {
      "buyer@test.com": {
        id: "1",
        email: "buyer@test.com",
        name: "Ahmad Pembeli",
        phone: "+62812345678",
        role: "buyer",
        permissions: ROLE_PERMISSIONS.buyer,
        profile: {
          avatar: "/placeholder.svg?height=100&width=100",
          address: "Jl. Sudirman No. 123",
          city: "Jakarta",
          province: "DKI Jakarta",
          postalCode: "12190",
        },
        createdAt: "2024-01-01",
        isVerified: true,
      },
      "farmer@test.com": {
        id: "2",
        email: "farmer@test.com",
        name: "Pak Budi Peternak",
        phone: "+62823456789",
        role: "farmer",
        permissions: ROLE_PERMISSIONS.farmer,
        profile: {
          avatar: "/placeholder.svg?height=100&width=100",
          address: "Jl. Raya Bogor KM 25",
          city: "Bogor",
          province: "Jawa Barat",
          postalCode: "16710",
          farmName: "Peternakan Maju Jaya",
          farmSize: "2 hectare",
          specialization: ["Ayam Kampung", "Ayam Broiler"],
          businessLicense: "NIB-123456789",
        },
        createdAt: "2023-06-01",
        isVerified: true,
      },
      "admin@test.com": {
        id: "3",
        email: "admin@test.com",
        name: "Admin System",
        phone: "+62834567890",
        role: "admin",
        permissions: ROLE_PERMISSIONS.admin,
        profile: {
          avatar: "/placeholder.svg?height=100&width=100",
          address: "Kantor Pusat",
          city: "Jakarta",
          province: "DKI Jakarta",
          postalCode: "10110",
        },
        createdAt: "2023-01-01",
        isVerified: true,
      },
    }

    return mockUsers[mockUserEmail] || null
  }

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false

    return user.permissions.some(
      (permission) =>
        (permission.resource === resource || permission.resource === "*") &&
        (permission.actions.includes(action) || permission.actions.includes("*")),
    )
  }

  const isRole = (role: string | string[]): boolean => {
    if (!user) return false

    if (Array.isArray(role)) {
      return role.includes(user.role)
    }

    return user.role === role
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in real app, this would be API call
      const validCredentials = [
        { email: "buyer@test.com", password: "buyer123" },
        { email: "farmer@test.com", password: "farmer123" },
        { email: "admin@test.com", password: "admin123" },
      ]

      const isValid = validCredentials.some((cred) => cred.email === email && cred.password === password)

      if (isValid) {
        const token = `mock-token-${Date.now()}`
        localStorage.setItem("auth-token", token)
        localStorage.setItem("user-email", email)

        const userData = await simulateGetUserData(token)
        if (userData) {
          setUser(userData)
          return true
        }
      }

      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration success
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
        permissions: ROLE_PERMISSIONS[data.role],
        profile: {
          farmName: data.farmName,
          farmSize: data.farmSize,
          businessLicense: data.businessLicense,
        },
        createdAt: new Date().toISOString(),
        isVerified: false,
      }

      const token = `mock-token-${Date.now()}`
      localStorage.setItem("auth-token", token)
      localStorage.setItem("user-email", data.email)

      setUser(newUser)
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-email")
    window.location.href = "/login"
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser((prev) => (prev ? { ...prev, ...data } : null))
    } catch (error) {
      console.error("Profile update failed:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        hasPermission,
        isRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
