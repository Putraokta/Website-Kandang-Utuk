"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { RoleGuard, AdminOnly, FarmerOnly } from "@/components/ui/role-guard"
import {
  ShoppingCart,
  User,
  Bell,
  Search,
  Heart,
  Menu,
  LogOut,
  MessageCircle,
  BarChart3,
  Package,
  Users,
  Settings,
  Gavel,
} from "lucide-react"

export default function RoleAwareHeader() {
  const { user, logout, isRole } = useAuth()
  const [activeTab, setActiveTab] = useState("home")

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout()
    }
  }

  const getRoleColor = () => {
    if (isRole("admin")) return "text-purple-600"
    if (isRole("farmer")) return "text-green-600"
    return "text-blue-600"
  }

  const getRoleBadge = () => {
    if (isRole("admin")) return "Admin"
    if (isRole("farmer")) return "Peternak"
    return "Pembeli"
  }

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      {/* ... header desktop ... */}
      {/* ... mobile menu ... */}
      {user && (
        <div className="lg:hidden border-t border-gray-200 px-4 py-2 bg-gray-50">
          {/* ... mobile user info ... */}
        </div>
      )}

      {/* *** Mulai navigasi mobile bawah *** */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/home"
            className={`flex flex-col items-center py-2 px-3 ${
              activeTab === "home" ? "text-orange-500" : "text-gray-500"
            }`}
          >
            {/* svg dan label */}
          </Link>

          {/* ... link lainnya sesuai role ... */}

          <button
            onClick={handleLogout}
            className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-red-500"
          >
            <LogOut className="w-6 h-6 mb-1" />
            <span className="text-xs">Keluar</span>
          </button>
        </div>
      </div>

      <div className="lg:hidden h-20"></div>
    </div>
  )
}
