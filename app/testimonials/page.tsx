"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Home, ShoppingCart, Heart, User, ArrowLeft } from "lucide-react"

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState("testimonials")

  const testimonials = [
    {
      id: 1,
      name: "Putri Pratama Okta Riano",
      avatar: "/Test1.jpg?height=50&width=50",
      rating: 5,
      date: "10:12 AM",
      comment:
        "Pelayanannya cepat, sistem berkualitas, dan pengiriman aman. Dengan sistem baru, saya bisa melacak pesanan saya secara real-time. Yang paling saya suka, sistemnya transparan dan terpercaya. Sangat direkomendasikan!",
    },
    {
      id: 2,
      name: "Allaya Daffa Zhillal",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "09:45 AM",
      comment: "Pengiriman yang cepat, dan pelayanan terpercaya, serta sistem berkualitas tinggi.",
    },
    {
      id: 3,
      name: "Naufal Maulana Izzuddin",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      date: "08:30 AM",
      comment: "Platform yang mudah dan sistematis, dan memudahkan saya untuk mencari aman dalam melakukan pembelian.",
    },
    {
      id: 4,
      name: "Dimas Sulistyo Nugroho",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "Yesterday",
      comment:
        "Saya sangat kagum dengan sistem listing yang baik dan memudahkan pengguna dalam mengikuti listing yang didapatkan diplatform ini.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center p-4">
          <Link href="/home" className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 flex-1">Feedback Pelanggan</h1>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="p-4">
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-b border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900">{testimonial.name}</h4>
                      <span className="text-xs text-gray-500">{testimonial.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{testimonial.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <Link href="/home" className="flex flex-col items-center py-2 px-3 text-gray-500">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Beranda</span>
          </Link>

          <Link href="/marketplace" className="flex flex-col items-center py-2 px-3 text-gray-500">
            <ShoppingCart className="w-6 h-6 mb-1" />
            <span className="text-xs">Marketplace</span>
          </Link>

          <button className="flex flex-col items-center py-2 px-3 text-orange-500">
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs">Testimoni</span>
          </button>

          <Link href="/profile" className="flex flex-col items-center py-2 px-3 text-gray-500">
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Profil</span>
          </Link>
        </div>
      </div>

      {/* Add bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}
