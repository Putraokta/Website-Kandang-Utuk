"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  ArrowLeft,
  ShoppingCart,
  User,
  Home,
  Heart,
  Clock,
  Users,
  Gavel,
  MessageCircle,
} from "lucide-react"

export default function AuctionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("auctions")

  const categories = [
    { id: "all", name: "Semua" },
    { id: "kampung", name: "Ayam Kampung" },
    { id: "broiler", name: "Broiler" },
    { id: "petelur", name: "Petelur" },
    { id: "jago", name: "Ayam Jago" },
    { id: "hias", name: "Ayam Hias" },
  ]

  const auctions = [
    {
      id: 1,
      name: "Bima SN x Blackdragon (Anakan) ",
      currentBid: "Rp 1.000.000",
      timeLeft: "2 jam 15 menit",
      image: "/7.jpg?height=150&width=150",
      bidders: 12,
      startPrice: "Rp 250.000",
      category: "Plucker",
      weight: "600 g",
      age: "3 bulan",
      location: "Kebumen, Jawa Tengah",
      seller: "Kandang Utuk Farm",
      isHot: true,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000), // 2 jam 15 menit dari sekarang
    },
    {
      id: 2,
      name: "Pajero x Blackdragon (Jantan)",
      currentBid: "Rp 3.000.000",
      timeLeft: "4 jam 30 menit",
      image: "/8.jpg?height=150&width=150",
      bidders: 8,
      startPrice: "Rp 500.000",
      category: "Pakoy",
      weight: "2.8 kg",
      age: "11 bulan",
      location: "Purwokerto, Jawa Tengah",
      seller: "Sejati Putra Farm",
      isHot: false,
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000 + 30 * 60 * 1000),
    },
    {
      id: 3,
      name: "Blackdragon x Blackbull (Jantan)",
      currentBid: "Rp 10.000.000",
      timeLeft: "1 jam 45 menit",
      image: "/9.jpg?height=150&width=150",
      bidders: 15,
      startPrice: "Rp 1.000.000",
      category: "Mangon",
      weight: "3.2 kg",
      age: "12 bulan",
      location: "Kebumen, Jawa Tengah",
      seller: "Allz Farm",
      isHot: true,
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000 + 45 * 60 * 1000),
    },
    {
      id: 4,
      name: "Pajero Jr (Jantan)",
      currentBid: "Rp 5.000.000",
      timeLeft: "6 jam 20 menit",
      image: "/10.jpg?height=150&width=150",
      bidders: 20,
      startPrice: "Rp 800.000",
      category: "Mangon",
      weight: "2.9 kg",
      age: "1 tahun",
      location: "Wonosobo, Jawa Tengah",
      seller: "Sumber Jaya Farm",
      isHot: false,
      endTime: new Date(Date.now() + 6 * 60 * 60 * 1000 + 20 * 60 * 1000),
    },
    {
      id: 5,
      name: "Kaolan x Shadow (Jantan)",
      currentBid: "Rp 3.000.000",
      timeLeft: "3 jam 10 menit",
      image: "/1.jpg?height=150&width=150",
      bidders: 6,
      startPrice: "Rp 750.000",
      category: "Mangon",
      weight: "2.8 kg",
      age: "4 bulan",
      location: "Purwokerto, Jawa Tengah",
      seller: "Osaf Farm",
      isHot: false,
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000 + 10 * 60 * 1000),
    },
    {
      id: 6,
      name: "Line Pajero Jr (Anakan)",
      currentBid: "Rp 800.000",
      timeLeft: "5 jam 45 menit",
      image: "/3.jpg?height=150&width=150",
      bidders: 9,
      startPrice: "Rp 350.000",
      category: "Pakoy",
      weight: "1.7 kg",
      age: "1 bulan",
      location: "Semarang, Jawa Tengah",
      seller: "Sanjaya Farm",
      isHot: false,
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 45 * 60 * 1000),
    },
  ]

  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch = auction.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || auction.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Function to format time left
  const formatTimeLeft = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Berakhir"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours} jam ${minutes} menit`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/home">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Pelelangan Ayam</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-6 h-6 text-gray-600" />
            <Filter className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari ayam lelang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-orange-50 border-b border-orange-200 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Menampilkan {filteredAuctions.length} lelang aktif</span>
          <div className="flex items-center space-x-4 text-orange-600">
            <div className="flex items-center space-x-1">
              <Gavel className="w-4 h-4" />
              <span>Live Auction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auctions Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredAuctions.map((auction) => (
            <Card
              key={auction.id}
              className="overflow-hidden border-2 border-orange-200 hover:border-orange-300 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.name}
                      className="w-full h-full object-cover"
                    />
                    {auction.isHot && (
                      <Badge className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 py-0">HOT</Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">{auction.name}</h4>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                      <span>Berat: {auction.weight}</span>
                      <span>Umur: {auction.age}</span>
                      <span>Lokasi: {auction.location}</span>
                      <span>Penjual: {auction.seller}</span>
                    </div>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Bid saat ini:</span>
                        <span className="text-orange-500 font-bold text-sm">{auction.currentBid}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Harga mulai:</span>
                        <span className="text-gray-600 text-xs">{auction.startPrice}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{auction.bidders} penawar</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-red-500">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{auction.timeLeft}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-2">
                      <Link href={`/auctions/${auction.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                          <Gavel className="w-4 h-4 mr-2" />
                          Ikut Lelang
                        </Button>
                      </Link>
                      <Link href={`/chat/auction-${auction.id}`}>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Gavel className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">Tidak ada lelang ditemukan</p>
            <p className="text-sm text-gray-400">Coba kata kunci lain atau kategori berbeda</p>
          </div>
        )}
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
