"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Users,
  Gavel,
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  Star,
  Trophy,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Eye,
  Phone,
  Shield,
  Truck,
} from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

interface AuctionDetail {
  id: string
  name: string
  description: string
  images: string[]
  currentBid: number
  startPrice: number
  buyNowPrice?: number
  bidIncrement: number
  totalBids: number
  watchers: number
  timeLeft: number // in milliseconds
  endTime: Date
  status: "active" | "ended" | "upcoming"
  category: string
  specifications: { [key: string]: string }
  seller: {
    id: string
    name: string
    avatar: string
    rating: number
    totalAuctions: number
    location: string
    joinDate: string
    responseTime: string
  }
  shipping: {
    cost: number
    methods: string[]
    estimatedDays: string
  }
  terms: string[]
}

interface Bid {
  id: string
  bidder: string
  amount: number
  timestamp: string
  isWinning: boolean
  isYourBid: boolean
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [bidAmount, setBidAmount] = useState("")
  const [isWatching, setIsWatching] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [timeLeft, setTimeLeft] = useState(0)
  const [showBidConfirm, setShowBidConfirm] = useState(false)

  // Sample auction data
  const auction: AuctionDetail = {
    id: params.id,
    name: "Ayam Kampung Super Grade A Premium",
    description:
      "Ayam kampung berkualitas super dengan grade A. Ayam sehat, aktif, dan sudah divaksin lengkap. Cocok untuk ternak atau konsumsi. Berat ideal dan postur bagus. Sudah terbukti kualitasnya dengan sertifikat kesehatan dari dokter hewan.",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    currentBid: 85000,
    startPrice: 50000,
    buyNowPrice: 150000,
    bidIncrement: 5000,
    totalBids: 12,
    watchers: 28,
    timeLeft: 2 * 60 * 60 * 1000 + 15 * 60 * 1000, // 2 jam 15 menit
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000),
    status: "active",
    category: "Ayam Kampung",
    specifications: {
      Berat: "1.5 kg",
      Umur: "6 bulan",
      Jenis: "Ayam Kampung",
      Kelamin: "Jantan",
      Vaksin: "Lengkap",
      Kesehatan: "Sangat Baik",
      Warna: "Coklat Keemasan",
      Asal: "Jawa Timur",
    },
    seller: {
      id: "seller-1",
      name: "Pak Budi Farm",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      totalAuctions: 156,
      location: "Jakarta Selatan",
      joinDate: "2020",
      responseTime: "< 30 menit",
    },
    shipping: {
      cost: 25000,
      methods: ["JNE", "SiCepat", "J&T Express"],
      estimatedDays: "1-2 hari",
    },
    terms: [
      "Pembayaran dalam 24 jam setelah lelang berakhir",
      "Barang dikirim setelah pembayaran dikonfirmasi",
      "Garansi hidup 7 hari setelah barang diterima",
      "Tidak ada pengembalian kecuali cacat tersembunyi",
      "Biaya pengiriman ditanggung pembeli",
    ],
  }

  const bidHistory: Bid[] = [
    {
      id: "1",
      bidder: "Ahmad***",
      amount: 85000,
      timestamp: "2 menit lalu",
      isWinning: true,
      isYourBid: false,
    },
    {
      id: "2",
      bidder: "Anda",
      amount: 80000,
      timestamp: "5 menit lalu",
      isWinning: false,
      isYourBid: true,
    },
    {
      id: "3",
      bidder: "Siti***",
      amount: 75000,
      timestamp: "8 menit lalu",
      isWinning: false,
      isYourBid: false,
    },
    {
      id: "4",
      bidder: "Budi***",
      amount: 70000,
      timestamp: "12 menit lalu",
      isWinning: false,
      isYourBid: false,
    },
    {
      id: "5",
      bidder: "Rina***",
      amount: 65000,
      timestamp: "18 menit lalu",
      isWinning: false,
      isYourBid: false,
    },
  ]

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = auction.endTime.getTime() - now
      setTimeLeft(distance > 0 ? distance : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [auction.endTime])

  // Set initial bid amount
  useEffect(() => {
    setBidAmount((auction.currentBid + auction.bidIncrement).toString())
  }, [auction.currentBid, auction.bidIncrement])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatTimeLeft = (milliseconds: number) => {
    if (milliseconds <= 0) return "Lelang Berakhir"

    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)

    if (hours > 0) {
      return `${hours}j ${minutes}m ${seconds}d`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}d`
    } else {
      return `${seconds}d`
    }
  }

  const handleBidSubmit = () => {
    const bidValue = Number.parseInt(bidAmount.replace(/\D/g, ""))

    if (bidValue < auction.currentBid + auction.bidIncrement) {
      alert(`Bid minimum adalah ${formatPrice(auction.currentBid + auction.bidIncrement)}`)
      return
    }

    if (bidValue > auction.buyNowPrice!) {
      alert(`Bid tidak boleh melebihi harga Buy Now ${formatPrice(auction.buyNowPrice!)}`)
      return
    }

    setShowBidConfirm(true)
  }

  const confirmBid = () => {
    const bidValue = Number.parseInt(bidAmount.replace(/\D/g, ""))
    console.log(`Bid placed: ${formatPrice(bidValue)}`)
    alert(`Bid berhasil! Anda memasang bid ${formatPrice(bidValue)}`)
    setShowBidConfirm(false)

    // Simulate bid update
    // In real app, this would come from websocket/API
  }

  const handleBuyNow = () => {
    if (auction.buyNowPrice) {
      console.log(`Buy now: ${formatPrice(auction.buyNowPrice)}`)
      alert(`Anda membeli dengan harga ${formatPrice(auction.buyNowPrice)}`)
      window.location.href = "/checkout"
    }
  }

  const toggleWatch = () => {
    setIsWatching(!isWatching)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: auction.name,
        text: auction.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link lelang disalin ke clipboard!")
    }
  }

  const getStatusBadge = () => {
    if (timeLeft <= 0) {
      return <Badge className="bg-red-500">Berakhir</Badge>
    } else if (timeLeft < 60 * 60 * 1000) {
      return <Badge className="bg-orange-500 animate-pulse">Segera Berakhir</Badge>
    } else {
      return <Badge className="bg-green-500">Aktif</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <BackButton fallbackHref="/auctions" />
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">{auction.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusBadge()}
                  <Badge variant="outline" className="text-xs">
                    {auction.category}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={toggleWatch} className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className={`w-5 h-5 ${isWatching ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden border">
                <img
                  src={auction.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={auction.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {auction.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? "border-orange-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${auction.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Detail</TabsTrigger>
                <TabsTrigger value="bids">Riwayat Bid ({auction.totalBids})</TabsTrigger>
                <TabsTrigger value="terms">Syarat & Ketentuan</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Deskripsi</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{auction.description}</p>

                    <h4 className="font-semibold mb-4">Spesifikasi</h4>
                    <div className="space-y-3">
                      {Object.entries(auction.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Garansi Hidup</span>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Truck className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">Pengiriman Aman</span>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">Vaksin Lengkap</span>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm font-medium">Grade A</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bids" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Riwayat Penawaran</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bidHistory.map((bid) => (
                        <div
                          key={bid.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            bid.isWinning
                              ? "border-green-200 bg-green-50"
                              : bid.isYourBid
                                ? "border-blue-200 bg-blue-50"
                                : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              {bid.isWinning && <Trophy className="w-4 h-4 text-green-600" />}
                              <span className={`font-medium ${bid.isYourBid ? "text-blue-600" : "text-gray-900"}`}>
                                {bid.bidder}
                              </span>
                              {bid.isYourBid && (
                                <Badge variant="outline" className="text-xs">
                                  Anda
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">{formatPrice(bid.amount)}</div>
                            <div className="text-xs text-gray-500">{bid.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="terms" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Syarat & Ketentuan</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {auction.terms.map((term, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{term}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Bidding Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card className="border-2 border-orange-200">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{formatPrice(auction.currentBid)}</div>
                  <p className="text-gray-600">Bid Tertinggi Saat Ini</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Harga Mulai:</span>
                    <span className="font-medium">{formatPrice(auction.startPrice)}</span>
                  </div>
                  {auction.buyNowPrice && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Beli Sekarang:</span>
                      <span className="font-medium text-green-600">{formatPrice(auction.buyNowPrice)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kenaikan Minimum:</span>
                    <span className="font-medium">{formatPrice(auction.bidIncrement)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span>Penawar</span>
                    </div>
                    <div className="font-bold text-gray-900">{auction.totalBids}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                      <Eye className="w-4 h-4" />
                      <span>Pengamat</span>
                    </div>
                    <div className="font-bold text-gray-900">{auction.watchers}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timer */}
            <Card className={`${timeLeft < 60 * 60 * 1000 ? "border-red-200 bg-red-50" : "border-gray-200"}`}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className={`w-5 h-5 ${timeLeft < 60 * 60 * 1000 ? "text-red-600" : "text-gray-600"}`} />
                  <span className="text-gray-600">Waktu Tersisa</span>
                </div>
                <div className={`text-2xl font-bold ${timeLeft < 60 * 60 * 1000 ? "text-red-600" : "text-gray-900"}`}>
                  {formatTimeLeft(timeLeft)}
                </div>
                {timeLeft < 60 * 60 * 1000 && timeLeft > 0 && (
                  <p className="text-sm text-red-600 mt-2">⚠️ Lelang akan segera berakhir!</p>
                )}
              </CardContent>
            </Card>

            {/* Bidding Form */}
            {timeLeft > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Pasang Penawaran</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jumlah Bid (Minimum: {formatPrice(auction.currentBid + auction.bidIncrement)})
                      </label>
                      <Input
                        type="text"
                        value={bidAmount}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          setBidAmount(value)
                        }}
                        placeholder={formatPrice(auction.currentBid + auction.bidIncrement)}
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBidAmount((auction.currentBid + auction.bidIncrement).toString())}
                      >
                        +{formatPrice(auction.bidIncrement)}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBidAmount((auction.currentBid + auction.bidIncrement * 2).toString())}
                      >
                        +{formatPrice(auction.bidIncrement * 2)}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBidAmount((auction.currentBid + auction.bidIncrement * 5).toString())}
                      >
                        +{formatPrice(auction.bidIncrement * 5)}
                      </Button>
                    </div>

                    <Button
                      onClick={handleBidSubmit}
                      className="w-full bg-orange-500 hover:bg-orange-600 h-12"
                      disabled={!bidAmount || Number.parseInt(bidAmount) < auction.currentBid + auction.bidIncrement}
                    >
                      <Gavel className="w-5 h-5 mr-2" />
                      Pasang Bid {bidAmount && formatPrice(Number.parseInt(bidAmount))}
                    </Button>

                    {auction.buyNowPrice && (
                      <Button
                        onClick={handleBuyNow}
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50 h-12"
                      >
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Beli Sekarang {formatPrice(auction.buyNowPrice)}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Seller Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <img
                    src={auction.seller.avatar || "/placeholder.svg"}
                    alt={auction.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{auction.seller.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{auction.seller.rating}</span>
                      <span>•</span>
                      <span>{auction.seller.totalAuctions} lelang</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{auction.seller.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Respon {auction.seller.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Bergabung {auction.seller.joinDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/chat/${auction.seller.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-1" />
                    Telepon
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Informasi Pengiriman</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ongkir:</span>
                    <span className="font-medium">{formatPrice(auction.shipping.cost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimasi:</span>
                    <span className="font-medium">{auction.shipping.estimatedDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kurir:</span>
                    <span className="font-medium">{auction.shipping.methods.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bid Confirmation Modal */}
      {showBidConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h3 className="text-lg font-semibold">Konfirmasi Penawaran</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-gray-600 mb-2">Anda akan memasang bid sebesar:</p>
                  <p className="text-2xl font-bold text-orange-600">{formatPrice(Number.parseInt(bidAmount || "0"))}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>Bid tidak dapat dibatalkan setelah dikonfirmasi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Anda akan dihubungi jika memenangkan lelang</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => setShowBidConfirm(false)}>
                    Batal
                  </Button>
                  <Button onClick={confirmBid} className="bg-orange-500 hover:bg-orange-600">
                    Konfirmasi Bid
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
