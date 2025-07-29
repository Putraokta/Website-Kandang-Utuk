"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackButton } from "@/components/ui/back-button"
import {
  Search,
  MessageCircle,
  CheckCheck,
  Check,
  Gavel,
  ShoppingBag,
  User,
  Home,
  Heart,
  ShoppingCart,
} from "lucide-react"

interface ChatPreview {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  type: "seller" | "auction"
  productInfo?: {
    name: string
    image: string
    price?: number
    currentBid?: number
  }
  messageStatus: "sent" | "delivered" | "read"
}

export default function ChatListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const chats: ChatPreview[] = [
    {
      id: "1",
      name: "Toko Pakan Jaya",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Baik pak, produknya ready stock. Bisa langsung order.",
      timestamp: "2 menit lalu",
      unreadCount: 2,
      isOnline: true,
      type: "seller",
      productInfo: {
        name: "Jagung Ayam Premium Grade A",
        image: "/placeholder.svg?height=40&width=40",
        price: 15000,
      },
      messageStatus: "read",
    },
    {
      id: "2",
      name: "Pak Budi Farm",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Lelang masih berjalan sampai jam 3 sore ya pak",
      timestamp: "15 menit lalu",
      unreadCount: 0,
      isOnline: true,
      type: "auction",
      productInfo: {
        name: "Ayam Kampung Super Grade A",
        image: "/placeholder.svg?height=40&width=40",
        currentBid: 85000,
      },
      messageStatus: "delivered",
    },
    {
      id: "3",
      name: "Fresh Market",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Terima kasih sudah order, akan segera dikirim",
      timestamp: "1 jam lalu",
      unreadCount: 0,
      isOnline: false,
      type: "seller",
      productInfo: {
        name: "Ayam Fillet ORGANIK",
        image: "/placeholder.svg?height=40&width=40",
        price: 75000,
      },
      messageStatus: "read",
    },
    {
      id: "4",
      name: "Organic Farm",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Produk organik kami dijamin kualitasnya",
      timestamp: "3 jam lalu",
      unreadCount: 1,
      isOnline: false,
      type: "seller",
      productInfo: {
        name: "Beras Merah Organik",
        image: "/placeholder.svg?height=40&width=40",
        price: 25000,
      },
      messageStatus: "sent",
    },
    {
      id: "5",
      name: "Peternakan Maju",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Bid Anda masih tertinggi, semoga berhasil!",
      timestamp: "5 jam lalu",
      unreadCount: 0,
      isOnline: true,
      type: "auction",
      productInfo: {
        name: "Sapi Limosin Unggul",
        image: "/placeholder.svg?height=40&width=40",
        currentBid: 25000000,
      },
      messageStatus: "read",
    },
  ]

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.productInfo?.name.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "sellers") return matchesSearch && chat.type === "seller"
    if (activeTab === "auctions") return matchesSearch && chat.type === "auction"

    return matchesSearch
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getTotalUnread = () => {
    return chats.reduce((total, chat) => total + chat.unreadCount, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <BackButton fallbackHref="/home" />
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Chat</h1>
                {getTotalUnread() > 0 && <p className="text-sm text-gray-500">{getTotalUnread()} pesan belum dibaca</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-gray-600" />
              {getTotalUnread() > 0 && (
                <Badge className="bg-red-500 text-white text-xs px-2 py-1">{getTotalUnread()}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Cari percakapan atau produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua ({chats.length})</TabsTrigger>
            <TabsTrigger value="sellers">Penjual ({chats.filter((c) => c.type === "seller").length})</TabsTrigger>
            <TabsTrigger value="auctions">Lelang ({chats.filter((c) => c.type === "auction").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {/* Chat List */}
            <div className="space-y-3">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <Link key={chat.id} href={`/chat/${chat.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <img
                              src={chat.avatar || "/placeholder.svg"}
                              alt={chat.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            {chat.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>

                          {/* Chat Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                                <div className="flex items-center space-x-1">
                                  {chat.type === "seller" ? (
                                    <ShoppingBag className="w-4 h-4 text-blue-500" />
                                  ) : (
                                    <Gavel className="w-4 h-4 text-purple-500" />
                                  )}
                                  <Badge
                                    variant="outline"
                                    className={`text-xs ${
                                      chat.type === "seller" ? "text-blue-600" : "text-purple-600"
                                    }`}
                                  >
                                    {chat.type === "seller" ? "Penjual" : "Lelang"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">{chat.timestamp}</span>
                                {chat.unreadCount > 0 && (
                                  <Badge className="bg-red-500 text-white text-xs px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                                    {chat.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Product Info */}
                            {chat.productInfo && (
                              <div className="flex items-center space-x-2 mb-2 p-2 bg-gray-50 rounded-lg">
                                <img
                                  src={chat.productInfo.image || "/placeholder.svg"}
                                  alt={chat.productInfo.name}
                                  className="w-8 h-8 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 truncate">{chat.productInfo.name}</p>
                                  <p className="text-xs text-orange-600 font-medium">
                                    {chat.type === "seller" && chat.productInfo.price
                                      ? formatPrice(chat.productInfo.price)
                                      : chat.type === "auction" && chat.productInfo.currentBid
                                        ? `Bid: ${formatPrice(chat.productInfo.currentBid)}`
                                        : ""}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Last Message */}
                            <div className="flex items-center justify-between">
                              <p
                                className={`text-sm truncate ${chat.unreadCount > 0 ? "font-medium text-gray-900" : "text-gray-600"}`}
                              >
                                {chat.lastMessage}
                              </p>
                              <div className="flex items-center space-x-1 ml-2">
                                {getMessageStatusIcon(chat.messageStatus)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchQuery ? "Tidak ada hasil" : "Belum ada percakapan"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery
                      ? `Tidak ditemukan percakapan untuk "${searchQuery}"`
                      : "Mulai chat dengan penjual atau penyelenggara lelang"}
                  </p>
                  {!searchQuery && (
                    <div className="space-y-3">
                      <Link href="/marketplace">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium">
                          Jelajahi Marketplace
                        </button>
                      </Link>
                      <Link href="/auctions">
                        <button className="border border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-2 rounded-lg font-medium">
                          Lihat Lelang
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <Link href="/home" className="flex flex-col items-center py-2 px-3 text-gray-500">
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

      <div className="lg:hidden h-16"></div>
    </div>
  )
}
