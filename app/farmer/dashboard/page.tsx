"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { FarmerOnly } from "@/components/ui/role-guard"
import Link from "next/link"
import { Package, Gavel, TrendingUp, Users, Plus, Eye, Edit, Trash2 } from "lucide-react"

export default function FarmerDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Produk",
      value: "24",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Lelang Aktif",
      value: "3",
      icon: Gavel,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Penjualan Bulan Ini",
      value: "Rp 15.2M",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Total Pembeli",
      value: "156",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentProducts = [
    { id: 1, name: "Ayam Kampung Super", price: "Rp 85.000", status: "Aktif", sold: 12 },
    { id: 2, name: "Ayam Broiler Premium", price: "Rp 65.000", status: "Aktif", sold: 8 },
    { id: 3, name: "Telur Ayam Kampung", price: "Rp 35.000", status: "Habis", sold: 25 },
  ]

  const activeAuctions = [
    { id: 1, name: "Ayam Jago Bangkok", currentBid: "Rp 120.000", timeLeft: "2 jam", bidders: 15 },
    { id: 2, name: "Ayam Petelur Unggul", currentBid: "Rp 95.000", timeLeft: "4 jam", bidders: 8 },
  ]

  return (
    <FarmerOnly fallback={<div>Access Denied</div>}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Peternak</h1>
            <p className="text-gray-600">
              Selamat datang kembali, <span className="font-medium text-green-600">{user?.name}</span>
            </p>
            {user?.profile?.farmName && (
              <p className="text-sm text-gray-500 mt-1">
                {user.profile.farmName} • {user.profile.farmSize}
              </p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Produk Terbaru</CardTitle>
                <Link href="/farmer/products">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Produk
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.price}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              product.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.status}
                          </span>
                          <span className="text-xs text-gray-500">{product.sold} terjual</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Auctions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Lelang Aktif</CardTitle>
                <Link href="/farmer/auctions">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Lelang
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeAuctions.map((auction) => (
                    <div key={auction.id} className="p-4 border rounded-lg border-orange-200 bg-orange-50">
                      <h4 className="font-medium text-gray-900 mb-2">{auction.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-orange-600 font-medium">Bid: {auction.currentBid}</p>
                          <p className="text-gray-500">{auction.bidders} penawar</p>
                        </div>
                        <div className="text-right">
                          <p className="text-red-600 font-medium">{auction.timeLeft}</p>
                          <p className="text-gray-500">tersisa</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/farmer/products/new">
                <Button className="w-full h-20 flex flex-col space-y-2 bg-green-600 hover:bg-green-700">
                  <Package className="w-6 h-6" />
                  <span>Tambah Produk</span>
                </Button>
              </Link>
              <Link href="/farmer/auctions/new">
                <Button className="w-full h-20 flex flex-col space-y-2 bg-orange-600 hover:bg-orange-700">
                  <Gavel className="w-6 h-6" />
                  <span>Buat Lelang</span>
                </Button>
              </Link>
              <Link href="/farmer/orders">
                <Button className="w-full h-20 flex flex-col space-y-2 bg-blue-600 hover:bg-blue-700">
                  <Users className="w-6 h-6" />
                  <span>Lihat Pesanan</span>
                </Button>
              </Link>
              <Link href="/farmer/analytics">
                <Button className="w-full h-20 flex flex-col space-y-2 bg-purple-600 hover:bg-purple-700">
                  <TrendingUp className="w-6 h-6" />
                  <span>Analitik</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FarmerOnly>
  )
}
