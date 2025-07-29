"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Gavel, Trophy, X, TrendingUp } from "lucide-react"

interface AuctionParticipation {
  id: string
  auctionName: string
  image: string
  myHighestBid: number
  currentBid: number
  status: "winning" | "outbid" | "won" | "lost" | "active"
  timeLeft: string
  endTime: string
  totalBids: number
  myBidCount: number
}

export default function MyAuctionsPage() {
  const myAuctions: AuctionParticipation[] = [
    {
      id: "1",
      auctionName: "Ayam Kampung Super Grade A",
      image: "/placeholder.svg?height=60&width=60",
      myHighestBid: 85000,
      currentBid: 85000,
      status: "winning",
      timeLeft: "2 jam 15 menit",
      endTime: "Hari ini, 16:30",
      totalBids: 12,
      myBidCount: 3,
    },
    {
      id: "2",
      auctionName: "Ayam Petelur Unggul Produktif",
      image: "/placeholder.svg?height=60&width=60",
      myHighestBid: 90000,
      currentBid: 95000,
      status: "outbid",
      timeLeft: "1 jam 45 menit",
      endTime: "Hari ini, 15:45",
      totalBids: 15,
      myBidCount: 2,
    },
    {
      id: "3",
      auctionName: "Ayam Broiler Premium",
      image: "/placeholder.svg?height=60&width=60",
      myHighestBid: 60000,
      currentBid: 65000,
      status: "outbid",
      timeLeft: "4 jam 30 menit",
      endTime: "Hari ini, 18:30",
      totalBids: 8,
      myBidCount: 1,
    },
    {
      id: "4",
      auctionName: "Ayam Jago Bangkok",
      image: "/placeholder.svg?height=60&width=60",
      myHighestBid: 100000,
      currentBid: 120000,
      status: "lost",
      timeLeft: "Berakhir",
      endTime: "Kemarin, 15:00",
      totalBids: 20,
      myBidCount: 4,
    },
    {
      id: "5",
      auctionName: "Ayam Kate Hias Cantik",
      image: "/placeholder.svg?height=60&width=60",
      myHighestBid: 45000,
      currentBid: 45000,
      status: "won",
      timeLeft: "Berakhir",
      endTime: "2 hari lalu, 14:00",
      totalBids: 6,
      myBidCount: 2,
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: AuctionParticipation["status"]) => {
    switch (status) {
      case "winning":
        return <Badge className="bg-green-500 text-white">Menang</Badge>
      case "outbid":
        return <Badge className="bg-yellow-500 text-white">Tersalip</Badge>
      case "won":
        return <Badge className="bg-blue-500 text-white">Menang</Badge>
      case "lost":
        return <Badge className="bg-red-500 text-white">Kalah</Badge>
      case "active":
        return <Badge className="bg-orange-500 text-white">Aktif</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: AuctionParticipation["status"]) => {
    switch (status) {
      case "winning":
        return <Trophy className="w-4 h-4 text-green-500" />
      case "outbid":
        return <TrendingUp className="w-4 h-4 text-yellow-500" />
      case "won":
        return <Trophy className="w-4 h-4 text-blue-500" />
      case "lost":
        return <X className="w-4 h-4 text-red-500" />
      case "active":
        return <Gavel className="w-4 h-4 text-orange-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const activeAuctions = myAuctions.filter(
    (auction) => auction.status === "winning" || auction.status === "outbid" || auction.status === "active",
  )

  const completedAuctions = myAuctions.filter((auction) => auction.status === "won" || auction.status === "lost")

  const AuctionCard = ({ auction }: { auction: AuctionParticipation }) => (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <img
            src={auction.image || "/placeholder.svg"}
            alt={auction.auctionName}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{auction.auctionName}</h3>
              {getStatusBadge(auction.status)}
            </div>

            <div className="space-y-1 text-xs text-gray-600 mb-3">
              <div className="flex justify-between">
                <span>Bid saya:</span>
                <span className="font-medium text-orange-600">{formatPrice(auction.myHighestBid)}</span>
              </div>
              <div className="flex justify-between">
                <span>Bid tertinggi:</span>
                <span className="font-medium">{formatPrice(auction.currentBid)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total bid saya:</span>
                <span className="font-medium">{auction.myBidCount}x</span>
              </div>
              <div className="flex justify-between">
                <span>Waktu tersisa:</span>
                <span className={auction.timeLeft === "Berakhir" ? "text-red-500" : "text-gray-600"}>
                  {auction.timeLeft}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {getStatusIcon(auction.status)}
                <span className="text-xs text-gray-500">{auction.endTime}</span>
              </div>
              <div className="flex space-x-2">
                {(auction.status === "outbid" || auction.status === "winning") && auction.timeLeft !== "Berakhir" && (
                  <Link href={`/auctions/${auction.id}`}>
                    <button className="text-xs text-orange-600 font-medium">Bid Lagi</button>
                  </Link>
                )}
                <Link href={`/auctions/${auction.id}`}>
                  <button className="text-xs text-blue-600 font-medium">Detail</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center p-4">
          <Link href="/profile" className="mr-3">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 flex-1">Lelang Saya</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">Aktif ({activeAuctions.length})</TabsTrigger>
            <TabsTrigger value="completed">Selesai ({completedAuctions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeAuctions.length > 0 ? (
              <div className="space-y-4">
                {activeAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Gavel className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Tidak ada lelang aktif</p>
                <p className="text-sm text-gray-400">Mulai ikut lelang untuk melihat riwayat di sini</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedAuctions.length > 0 ? (
              <div className="space-y-4">
                {completedAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Belum ada lelang selesai</p>
                <p className="text-sm text-gray-400">Riwayat lelang yang sudah berakhir akan muncul di sini</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20"></div>
    </div>
  )
}
