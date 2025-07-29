export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "buyer" | "farmer" | "admin"
  permissions: Permission[]
  profile: UserProfile
  createdAt: string
  isVerified: boolean
}

export interface Permission {
  resource: string // 'products', 'auctions', 'users', 'orders', 'analytics'
  actions: string[] // ['create', 'read', 'update', 'delete', 'bid']
}

export interface UserProfile {
  avatar?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
  farmName?: string // Untuk farmer
  farmSize?: string // Untuk farmer
  specialization?: string[] // Untuk farmer
  businessLicense?: string // Untuk farmer
}

// Role definitions
export const ROLES = {
  BUYER: "buyer",
  FARMER: "farmer",
  ADMIN: "admin",
} as const

export const ROLE_PERMISSIONS = {
  buyer: [
    { resource: "products", actions: ["read"] },
    { resource: "auctions", actions: ["read", "bid"] },
    { resource: "orders", actions: ["create", "read"] },
    { resource: "chat", actions: ["create", "read"] },
    { resource: "testimonials", actions: ["create", "read"] },
  ],
  farmer: [
    { resource: "products", actions: ["create", "read", "update", "delete"] },
    { resource: "auctions", actions: ["create", "read", "update", "delete", "bid"] },
    { resource: "orders", actions: ["read", "update"] },
    { resource: "chat", actions: ["create", "read"] },
    { resource: "analytics", actions: ["read"] },
    { resource: "testimonials", actions: ["read"] },
  ],
  admin: [
    { resource: "products", actions: ["create", "read", "update", "delete"] },
    { resource: "auctions", actions: ["create", "read", "update", "delete"] },
    { resource: "orders", actions: ["read", "update", "delete"] },
    { resource: "users", actions: ["create", "read", "update", "delete"] },
    { resource: "testimonials", actions: ["create", "read", "update", "delete"] },
    { resource: "analytics", actions: ["read"] },
    { resource: "news", actions: ["create", "read", "update", "delete"] },
    { resource: "chat", actions: ["create", "read", "update", "delete"] },
  ],
} as const

export type Role = keyof typeof ROLE_PERMISSIONS
