"use client"

import { useAuth } from "@/contexts/auth-context"
import type { ReactNode } from "react"

interface RoleGuardProps {
  roles?: string | string[]
  permissions?: { resource: string; action: string }
  children: ReactNode
  fallback?: ReactNode
  showFallback?: boolean
}

export function RoleGuard({ roles, permissions, children, fallback = null, showFallback = false }: RoleGuardProps) {
  const { user, isRole, hasPermission } = useAuth()

  if (!user) {
    return showFallback ? fallback : null
  }

  // Check role-based access
  if (roles) {
    const roleArray = Array.isArray(roles) ? roles : [roles]
    if (!roleArray.some((role) => isRole(role))) {
      return showFallback ? fallback : null
    }
  }

  // Check permission-based access
  if (permissions && !hasPermission(permissions.resource, permissions.action)) {
    return showFallback ? fallback : null
  }

  return <>{children}</>
}

// Specific role components for easier usage
export function BuyerOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles="buyer" fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function FarmerOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles="farmer" fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles="admin" fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function FarmerOrAdmin({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard roles={["farmer", "admin"]} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}
