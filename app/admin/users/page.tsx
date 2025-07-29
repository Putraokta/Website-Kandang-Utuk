"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  Search,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Users,
  MoreHorizontal,
  UserPlus,
  Download,
  Mail,
  Phone,
} from "lucide-react"

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const users = [
    {
      id: 1,
      name: "Ahmad Pembeli",
      email: "ahmad@test.com",
      phone: "+62812345678",
      role: "buyer",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-20",
      totalOrders: 12,
      totalSpent: "Rp 2.5M",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Pak Budi Peternak",
      email: "budi@test.com",
      phone: "+62823456789",
      role: "farmer",
      status: "pending",
      joinDate: "2024-01-14",
      lastLogin: "2024-01-19",
      totalProducts: 8,
      totalRevenue: "Rp 15.2M",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Siti Aminah",
      email: "siti@test.com",
      phone: "+62834567890",
      role: "buyer",
      status: "active",
      joinDate: "2024-01-13",
      lastLogin: "2024-01-18",
      totalOrders: 5,
      totalSpent: "Rp 850K",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Pak Joko",
      email: "joko@test.com",
      phone: "+62845678901",
      role: "farmer",
      status: "suspended",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-12",
      totalProducts: 3,
      totalRevenue: "Rp 5.1M",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
      case "pending":
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
      case "suspended":
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Suspended</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "buyer":
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Buyer</span>
      case "farmer":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Farmer</span>
      case "admin":
        return <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Admin</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const pendingUsers = users.filter((u) => u.status === "pending").length
  const suspendedUsers = users.filter((u) => u.status === "suspended").length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage all platform users</p>
          </div>
          <div className="flex space-x-2 mt-4 lg:mt-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingUsers}</p>
                </div>
                <XCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspended</p>
                  <p className="text-2xl font-bold text-red-600">{suspendedUsers}</p>
                </div>
                <Ban className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="buyer">Buyers</option>
                  <option value="farmer">Farmers</option>
                  <option value="admin">Admins</option>
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                          {getRoleBadge(user.role)}
                          {getStatusBadge(user.status)}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-gray-500">Joined</p>
                            <p className="font-medium">{user.joinDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Last Login</p>
                            <p className="font-medium">{user.lastLogin}</p>
                          </div>
                          {user.role === "buyer" ? (
                            <>
                              <div>
                                <p className="text-gray-500">Orders</p>
                                <p className="font-medium">{user.totalOrders}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Total Spent</p>
                                <p className="font-medium text-green-600">{user.totalSpent}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <p className="text-gray-500">Products</p>
                                <p className="font-medium">{user.totalProducts}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Revenue</p>
                                <p className="font-medium text-green-600">{user.totalRevenue}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {user.status === "active" && (
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
