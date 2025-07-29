"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  Users,
  Package,
  Gavel,
  BarChart3,
  Settings,
  MessageSquare,
  FileText,
  Shield,
  Bell,
  Home,
  ChevronLeft,
  LogOut,
  User,
} from "lucide-react"

const adminMenuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Product Management",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Auction Management",
    href: "/admin/auctions",
    icon: Gavel,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Messages & Reports",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Content Management",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Security",
    href: "/admin/security",
    icon: Shield,
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

interface AdminSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout()
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-gray-900 text-white transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <p className="text-sm text-gray-400">Management System</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-gray-700 hover:text-white"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-purple-400">Administrator</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {adminMenuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="space-y-2">
          <Link href="/home">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white",
                collapsed && "justify-center",
              )}
            >
              <Home className="w-4 h-4" />
              {!collapsed && <span className="ml-2">Back to Site</span>}
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start text-gray-300 hover:bg-red-600 hover:text-white",
              collapsed && "justify-center",
            )}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
