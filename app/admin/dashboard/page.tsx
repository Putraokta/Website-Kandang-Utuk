"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/admin-layout"
import {
  Users,
  Package,
  Gavel,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  ShoppingBag,
  MessageSquare,
  Eye,
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "blue",
    },
    {
      title: "Total Products",
      value: "856",
      change: "+8%",
      changeType: "increase",
      icon: Package,
      color: "green",
    },
    {
      title: "Active Auctions",
      value: "23",
      change: "+15%",
      changeType: "increase",
      icon: Gavel,
      color: "orange",
    },
    {
      title: "Revenue (Month)",
      value: "Rp 125M",
      change: "+22%",
      changeType: "increase",
      icon: DollarSign,
      color: "purple",
    },
    {
      title: "Orders Today",
      value: "47",
      change: "+5%",
      changeType: "increase",
      icon: ShoppingBag,
      color: "indigo",
    },
    {
      title: "Pending Reviews",
      value: "12",
      change: "-3%",
      changeType: "decrease",
      icon: Clock,
      color: "yellow",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "user",
      action: "New user registered",
      user: "Ahmad Pembeli",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "product",
      action: "Product awaiting approval",
      user: "Pak Budi",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      id: 3,
      type: "auction",
      action: "Auction ended",
      user: "Pak Slamet",
      time: "10 minutes ago",
      status: "completed",
    },
    {
      id: 4,
      type: "order",
      action: "Payment confirmed",
      user: "Siti Aminah",
      time: "15 minutes ago",
      status: "success",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "product",
      title: "Ayam Kampung Premium",
      user: "Pak Budi",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      type: "auction",
      title: "Lelang Ayam Jago",
      user: "Pak Slamet",
      date: "2024-01-14",
      priority: "medium",
    },
    {
      id: 3,
      type: "user",
      title: "Farmer Verification",
      user: "Pak Joko",
      date: "2024-01-13",
      priority: "low",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "completed":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">by {activity.user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                      <p className={`text-xs font-medium ${getStatusColor(activity.status)}`}>{activity.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Pending Approvals</span>
              </CardTitle>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {pendingApprovals.length}
              </span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg border-orange-200 bg-orange-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">by {item.user}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 bg-transparent">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button className="h-20 flex flex-col space-y-2 bg-blue-600 hover:bg-blue-700">
                <Users className="w-6 h-6" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-green-600 hover:bg-green-700">
                <Package className="w-6 h-6" />
                <span className="text-sm">Products</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-orange-600 hover:bg-orange-700">
                <Gavel className="w-6 h-6" />
                <span className="text-sm">Auctions</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm">Analytics</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-indigo-600 hover:bg-indigo-700">
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Messages</span>
              </Button>
              <Button className="h-20 flex flex-col space-y-2 bg-gray-600 hover:bg-gray-700">
                <CheckCircle className="w-6 h-6" />
                <span className="text-sm">Approvals</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
