"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, CreditCard, Building2 } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  seller: string
}

export default function CheckoutPage() {
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Ayam Fillet ORGANIK",
      price: 180000,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
      seller: "Organic Farm",
    },
    {
      id: 2,
      name: "Ayam Fillet ORGANIK",
      price: 75000,
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
      seller: "Fresh Market",
    },
  ])

  // Bank data
  const bankData = {
    bri: { name: "Bank Rakyat Indonesia (BRI)", logo: "/placeholder.svg?height=24&width=40" },
    bca: { name: "Bank Central Asia (BCA)", logo: "/placeholder.svg?height=24&width=40" },
    mandiri: { name: "Bank Mandiri", logo: "/placeholder.svg?height=24&width=40" },
    bni: { name: "Bank Negara Indonesia (BNI)", logo: "/placeholder.svg?height=24&width=40" },
    cimb: { name: "CIMB Niaga", logo: "/placeholder.svg?height=24&width=40" },
    danamon: { name: "Bank Danamon", logo: "/placeholder.svg?height=24&width=40" },
    permata: { name: "Bank Permata", logo: "/placeholder.svg?height=24&width=40" },
    maybank: { name: "Maybank Indonesia", logo: "/placeholder.svg?height=24&width=40" },
  }

  useEffect(() => {
    // Get selected bank from localStorage
    const storedBank = localStorage.getItem("selectedBank")
    if (storedBank) {
      setSelectedBank(storedBank)
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const shippingCost = 15000
  const serviceFee = 5000
  const total = getSubtotal() + shippingCost + serviceFee

  const currentBank = selectedBank ? bankData[selectedBank as keyof typeof bankData] : null

  const handlePayNow = () => {
    if (!selectedBank) {
      alert("Mohon pilih metode pembayaran terlebih dahulu")
      return
    }
    // Redirect to payment confirmation with bank details
    window.location.href = "/checkout/payment-confirmation"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center p-4">
          <BackButton fallbackHref="/cart" />
          <h1 className="text-lg font-bold text-gray-900">Konfirmasi Pembayaran</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Shipping Address */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Alamat Pengiriman</h3>
              <Link href="/checkout/address">
                <Button variant="outline" size="sm">
                  Ubah
                </Button>
              </Link>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Haikal Maulana</p>
                <p className="text-sm text-gray-600">+62 812 3456 7890</p>
                <p className="text-sm text-gray-600">
                  Jl. Sudirman No. 123, RT 01/RW 02, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Pesanan Anda</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.seller}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                      <span className="font-medium text-orange-600">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Ringkasan Pembayaran</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ongkos Kirim</span>
                <span className="text-gray-900">{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Biaya Layanan</span>
                <span className="text-gray-900">{formatPrice(serviceFee)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Metode Pembayaran</h3>
              <Link href="/checkout/payment">
                <Button variant="outline" size="sm">
                  {selectedBank ? "Ganti" : "Pilih"}
                </Button>
              </Link>
            </div>

            {currentBank ? (
              <div className="flex items-center space-x-3 p-3 border border-orange-200 bg-orange-50 rounded-lg">
                <Building2 className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Transfer Bank</p>
                  <p className="text-sm text-gray-600">{currentBank.name}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-500">Belum dipilih</p>
                  <p className="text-sm text-gray-400">Pilih metode pembayaran</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Total Pembayaran</span>
          <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
        </div>
        <Button
          onClick={handlePayNow}
          className={`w-full ${selectedBank ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"}`}
          disabled={!selectedBank}
        >
          {selectedBank ? "Bayar Sekarang" : "Pilih Metode Pembayaran Dulu"}
        </Button>
      </div>

      <div className="h-24"></div>
    </div>
  )
}
