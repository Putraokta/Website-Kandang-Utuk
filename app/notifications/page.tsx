"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, ShoppingCart, Heart, User } from "lucide-react"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("home")

  const notifications = [
    {
      id: 1,
      type: "Pesanan selesai",
      title: "Jagung Premium",
      image: "/1.jpg?height=60&width=60",
      date: "07-04-2023 13:45",
      message: "Pesanan #ID-234-2023 telah selesai (rating)",
      isRead: false,
    },
    {
      id: 2,
      type: "Pesanan dikirimkan",
      title: "Kedelai",
      image: "/2.jpg?height=60&width=60",
      date: "07-03-2023 10:15",
      message: "Pesanan sedang dalam perjalanan menuju alamat pengiriman",
      isRead: false,
    },
    {
      id: 3,
      type: "Pesanan dikirimkan",
      title: "Kedelai",
      image: "/3.jpg?height=60&width=60",
      date: "07-03-2023 09:30",
      message: "Pesanan sedang dalam perjalanan menuju alamat pengiriman",
      isRead: true,
    },
    {
      id: 4,
      type: "Pesanan dikirimkan",
      title: "Kedelai",
      image: "/4.jpg?height=60&width=60",
      date: "07-02-2023 14:45",
      message: "Pesanan sedang dalam perjalanan menuju alamat pengiriman",
      isRead: true,
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
          <h1 className="text-lg font-bold text-gray-900 flex-1">Notifikasi</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-l-4 ${notification.isRead ? "border-l-gray-300" : "border-l-orange-500"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={notification.image || "/placeholder.svg"}
                    alt={notification.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500">{notification.type}</span>
                      <span className="text-xs text-gray-400">{notification.date}</span>
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.message}</p>
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
          <Link href="/home" className="flex flex-col items-center py-2 px-3 text-orange-500">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Beranda</span>
          </Link>

          <Link href="/marketplace" className="flex flex-col items-center py-2 px-3 text-gray-500">
            <ShoppingCart className="w-6 h-6 mb-1" />
            <span className="text-xs">Marketplace</span>
          </Link>

          <Link href="/testimonials" className="flex flex-col items-center py-2 px-3 text-gray-500">
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs">Testimoni</span>
          </Link>

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
