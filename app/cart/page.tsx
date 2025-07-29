"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  seller: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Ayam Fillet ORGANIK",
      price: 180000,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      seller: "Organic Farm",
    },
    {
      id: 2,
      name: "Ayam Fillet ORGANIK",
      price: 75000,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      seller: "Fresh Market",
    },
    {
      id: 3,
      name: "Ayam Fillet ORGANIK",
      price: 50000,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
      seller: "Local Farm",
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <BackButton fallbackHref="/marketplace" />
              <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Keranjang Belanja</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="text-sm lg:text-base font-medium text-gray-600">({getTotalItems()} item)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base lg:text-lg text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.seller}</p>
                        <p className="text-orange-500 font-bold text-lg lg:text-xl mb-4">{formatPrice(item.price)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="font-medium text-gray-900 min-w-[30px] text-center text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({getTotalItems()} item)</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkos Kirim</span>
                      <span>Rp 15.000</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Biaya Layanan</span>
                      <span>Rp 5.000</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-orange-600">{formatPrice(getTotalPrice() + 20000)}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg">Checkout</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-medium text-gray-900 mb-4">Keranjang Kosong</h3>
            <p className="text-gray-500 mb-8 text-lg">Belum ada produk di keranjang Anda</p>
            <Link href="/marketplace">
              <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 text-lg">Mulai Belanja</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
