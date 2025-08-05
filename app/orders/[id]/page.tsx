"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Clock, CheckCircle, AlertCircle, MapPin, Truck, CreditCard, FileText } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

interface OrderDetail {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  paymentMethod: string
  paymentStatus: "pending" | "confirmed" | "failed"
  shippingAddress: {
    name: string
    phone: string
    address: string
  }
  shippingMethod: string
  shippingCost: number
  trackingNumber?: string
  timeline: {
    status: string
    date: string
    description: string
  }[]
}

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  seller: string
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  // Simulasi data pesanan
  const orderDetail: OrderDetail = {
    id: orderId,
    date: "12 Juni 2024, 14:30 WIB",
    total: 275000,
    status: "shipped",
    paymentMethod: "Transfer Bank BRI",
    paymentStatus: "confirmed",
    shippingAddress: {
      name: "Haikal Maulana",
      phone: "+62 812 3456 7890",
      address: "Jl. Sudirman No. 123, RT 01/RW 02, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190",
    },
    shippingMethod: "JNE Regular (2-3 hari)",
    shippingCost: 15000,
    trackingNumber: "JNE-123456789",
    items: [
      {
        id: 1,
        name: "Kaolan x Shadow (Jantan)",
        price: 2500000,
        quantity: 1,
        image: "/1.jpg?height=80&width=80",
        seller: "Kandang Utuk Farm",
      },
      {
        id: 2,
        name: "Ayam Fillet ORGANIK",
        price: 75000,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        seller: "Fresh Market",
      },
    ],
    timeline: [
      {
        status: "ordered",
        date: "12 Juni 2024, 14:30",
        description: "Pesanan dibuat",
      },
      {
        status: "payment_confirmed",
        date: "12 Juni 2024, 15:45",
        description: "Pembayaran dikonfirmasi",
      },
      {
        status: "processing",
        date: "13 Juni 2024, 09:15",
        description: "Pesanan sedang diproses",
      },
      {
        status: "shipped",
        date: "14 Juni 2024, 10:30",
        description: "Pesanan dikirim",
      },
    ],
  }

  const getStatusBadge = (status: OrderDetail["status"]) => {
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

  const getStatusIcon = (status: OrderDetail["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-6 h-6 text-yellow-500" />
      case "processing":
        return <Package className="w-6 h-6 text-blue-500" />
      case "shipped":
        return <Truck className="w-6 h-6 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "cancelled":
        return <AlertCircle className="w-6 h-6 text-red-500" />
      default:
        return <Package className="w-6 h-6 text-gray-500" />
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getActionButton = (status: OrderDetail["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Link href={`/checkout/payment-confirmation?order=${orderDetail.id}`}>
            <Button className="bg-orange-500 hover:bg-orange-600">Bayar Sekarang</Button>
          </Link>
        )
      case "shipped":
        return <Button className="bg-orange-500 hover:bg-orange-600">Lacak Pengiriman</Button>
      case "delivered":
        return <Button className="bg-orange-500 hover:bg-orange-600">Beri Ulasan</Button>
      default:
        return null
    }
  }

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "ordered":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "payment_confirmed":
        return <CreditCard className="w-5 h-5 text-green-500" />
      case "processing":
        return <Package className="w-5 h-5 text-orange-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            <BackButton fallbackHref="/orders" />
            <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Detail Pesanan</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {getStatusIcon(orderDetail.status)}
                  <div>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-bold text-gray-900">{orderDetail.id}</h2>
                      {getStatusBadge(orderDetail.status)}
                    </div>
                    <p className="text-gray-500 mt-1">Tanggal Pemesanan: {orderDetail.date}</p>
                  </div>
                </div>

                {orderDetail.trackingNumber && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-blue-900">Informasi Pengiriman</h3>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <div>
                        <span className="text-sm text-blue-800">Kurir: </span>
                        <span className="text-sm font-medium text-blue-900">{orderDetail.shippingMethod}</span>
                      </div>
                      <div>
                        <span className="text-sm text-blue-800">No. Resi: </span>
                        <span className="text-sm font-medium text-blue-900">{orderDetail.trackingNumber}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-4">{getActionButton(orderDetail.status)}</div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Status Pesanan</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderDetail.timeline.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Vertical line */}
                      {index < orderDetail.timeline.length - 1 && (
                        <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                      )}

                      <div className="flex items-start">
                        <div className="bg-white rounded-full p-1 z-10">{getTimelineIcon(item.status)}</div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-900">{item.description}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Produk yang Dibeli</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetail.items.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.seller}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-medium text-orange-600">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Payment Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Informasi Pembayaran</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metode Pembayaran</span>
                    <span className="font-medium text-gray-900">{orderDetail.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status Pembayaran</span>
                    <span
                      className={`font-medium ${
                        orderDetail.paymentStatus === "confirmed"
                          ? "text-green-600"
                          : orderDetail.paymentStatus === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {orderDetail.paymentStatus === "confirmed"
                        ? "Dikonfirmasi"
                        : orderDetail.paymentStatus === "pending"
                          ? "Menunggu"
                          : "Gagal"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Alamat Pengiriman</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{orderDetail.shippingAddress.name}</p>
                    <p className="text-sm text-gray-600">{orderDetail.shippingAddress.phone}</p>
                    <p className="text-sm text-gray-600 mt-1">{orderDetail.shippingAddress.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Ringkasan Pembayaran</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      {formatPrice(orderDetail.items.reduce((total, item) => total + item.price * item.quantity, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ongkos Kirim</span>
                    <span className="text-gray-900">{formatPrice(orderDetail.shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Layanan</span>
                    <span className="text-gray-900">{formatPrice(5000)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">{formatPrice(orderDetail.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Ada pertanyaan tentang pesanan ini?</p>
                  <Button variant="outline" className="w-full">
                    Hubungi Customer Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
