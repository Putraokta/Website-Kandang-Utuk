"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle, ChevronRight, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: number
  paymentMethod: string
  trackingNumber?: string
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const orders: Order[] = [
    {
      id: "ORD-2024-001234",
      date: "12 Juni 2024",
      total: 275000,
      status: "pending",
      items: 3,
      paymentMethod: "Transfer Bank BRI",
    },
    {
      id: "ORD-2024-001233",
      date: "10 Juni 2024",
      total: 150000,
      status: "processing",
      items: 2,
      paymentMethod: "Transfer Bank BCA",
    },
    {
      id: "ORD-2024-001232",
      date: "5 Juni 2024",
      total: 320000,
      status: "shipped",
      items: 4,
      paymentMethod: "Transfer Bank Mandiri",
      trackingNumber: "JNE-123456789",
    },
    {
      id: "ORD-2024-001231",
      date: "1 Juni 2024",
      total: 95000,
      status: "delivered",
      items: 1,
      paymentMethod: "Transfer Bank BNI",
      trackingNumber: "SiCepat-987654321",
    },
    {
      id: "ORD-2024-001230",
      date: "28 Mei 2024",
      total: 210000,
      status: "cancelled",
      items: 2,
      paymentMethod: "Transfer Bank BCA",
    },
  ]

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Menunggu Pembayaran</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Diproses</Badge>
      case "shipped":
        return <Badge className="bg-purple-500">Dikirim</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Selesai</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Dibatalkan</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Package className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || order.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <Link href="/home">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Pesanan Saya</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Search className="w-6 h-6 text-gray-600" />
              <Filter className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari pesanan berdasarkan nomor pesanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 mb-6">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu Pembayaran</TabsTrigger>
            <TabsTrigger value="processing">Diproses</TabsTrigger>
            <TabsTrigger value="shipped">Dikirim</TabsTrigger>
            <TabsTrigger value="delivered">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <EmptyState query={searchQuery} />
            )}
          </TabsContent>

          {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
            <TabsContent key={status} value={status} className="mt-0">
              {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <EmptyState status={status} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Menunggu Pembayaran</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Diproses</Badge>
      case "shipped":
        return <Badge className="bg-purple-500">Dikirim</Badge>
      case "delivered":
        return <Badge className="bg-green-500">Selesai</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Dibatalkan</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Package className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getActionButton = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Link href={`/checkout/payment-confirmation?order=${order.id}`}>
            <Button className="bg-orange-500 hover:bg-orange-600">Bayar Sekarang</Button>
          </Link>
        )
      case "shipped":
        return <Button variant="outline">Lacak Pengiriman</Button>
      case "delivered":
        return <Button variant="outline">Beri Ulasan</Button>
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-start space-x-4">
            <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              {getStatusIcon(order.status)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="lg:hidden">{getStatusIcon(order.status)}</div>
                  <h3 className="font-medium text-gray-900">{order.id}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <span className="text-sm text-gray-500">{order.date}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 mb-4">
                <div className="text-sm">
                  <span className="text-gray-500">Total: </span>
                  <span className="font-medium text-gray-900">{formatPrice(order.total)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Item: </span>
                  <span className="font-medium text-gray-900">{order.items} produk</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Pembayaran: </span>
                  <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="text-sm mb-4">
                  <span className="text-gray-500">No. Resi: </span>
                  <span className="font-medium text-gray-900">{order.trackingNumber}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-3">{getActionButton(order.status)}</div>
                <Link href={`/orders/${order.id}`} className="flex items-center text-orange-500 hover:text-orange-600">
                  <span className="text-sm font-medium">Detail</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ status, query }: { status?: string; query?: string }) {
  let message = "Tidak ada pesanan ditemukan"
  let description = "Belum ada pesanan yang dibuat"

  if (query) {
    message = "Tidak ada hasil pencarian"
    description = `Tidak ada pesanan yang cocok dengan "${query}"`
  } else if (status) {
    switch (status) {
      case "pending":
        description = "Tidak ada pesanan yang menunggu pembayaran"
        break
      case "processing":
        description = "Tidak ada pesanan yang sedang diproses"
        break
      case "shipped":
        description = "Tidak ada pesanan yang sedang dikirim"
        break
      case "delivered":
        description = "Tidak ada pesanan yang telah selesai"
        break
      case "cancelled":
        description = "Tidak ada pesanan yang dibatalkan"
        break
    }
  }

  return (
    <div className="text-center py-16">
      <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-500 mb-8">{description}</p>
      <Link href="/marketplace">
        <Button className="bg-orange-500 hover:bg-orange-600">Belanja Sekarang</Button>
      </Link>
    </div>
  )
}
