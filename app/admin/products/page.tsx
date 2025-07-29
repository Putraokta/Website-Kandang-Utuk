"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Search, Eye, Edit, Trash2, CheckCircle, XCircle, Package, Plus, Download, Star, Clock } from "lucide-react"

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const products = [
    {
      id: 1,
      name: "Ayam Kampung Premium",
      category: "Ayam",
      price: "Rp 85,000",
      farmer: "Pak Budi",
      status: "active",
      stock: 25,
      sold: 120,
      rating: 4.8,
      reviews: 45,
      createdDate: "2024-01-15",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Telur Ayam Organik",
      category: "Telur",
      price: "Rp 35,000",
      farmer: "Bu Siti",
      status: "pending",
      stock: 100,
      sold: 85,
      rating: 4.6,
      reviews: 32,
      createdDate: "2024-01-14",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Ayam Broiler Segar",
      category: "Ayam",
      price: "Rp 45,000",
      farmer: "Pak Joko",
      status: "suspended",
      stock: 0,
      sold: 200,
      rating: 4.2,
      reviews: 28,
      createdDate: "2024-01-12",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Daging Ayam Potong",
      category: "Daging",
      price: "Rp 55,000",
      farmer: "Pak Ahmad",
      status: "active",
      stock: 50,
      sold: 75,
      rating: 4.9,
      reviews: 18,
      createdDate: "2024-01-10",
      image: "/placeholder.svg?height=60&width=60",
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

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: "text-red-600", text: "Out of Stock" }
    if (stock < 10) return { color: "text-yellow-600", text: "Low Stock" }
    return { color: "text-green-600", text: "In Stock" }
  }

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const pendingProducts = products.filter((p) => p.status === "pending").length
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-2">Manage all products on the platform</p>
          </div>
          <div className="flex space-x-2 mt-4 lg:mt-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{pendingProducts}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sold</p>
                  <p className="text-2xl font-bold text-purple-600">{totalSold}</p>
                </div>
                <Star className="w-8 h-8 text-purple-600" />
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
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Ayam">Ayam</option>
                  <option value="Telur">Telur</option>
                  <option value="Daging">Daging</option>
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

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {product.category}
                          </span>
                          {getStatusBadge(product.status)}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span>by {product.farmer}</span>
                          <span className="text-lg font-bold text-green-600">{product.price}</span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-gray-500">Stock</p>
                            <p className={`font-medium ${getStockStatus(product.stock).color}`}>
                              {product.stock} units
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Sold</p>
                            <p className="font-medium">{product.sold} units</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Rating</p>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium">{product.rating}</span>
                              <span className="text-gray-400">({product.reviews})</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-500">Created</p>
                            <p className="font-medium">{product.createdDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Status</p>
                            <p className={`font-medium ${getStockStatus(product.stock).color}`}>
                              {getStockStatus(product.stock).text}
                            </p>
                          </div>
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
                      {product.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 bg-transparent">
                        <Trash2 className="w-4 h-4" />
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
