"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Gavel, Trophy, X } from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

export default function MyBidsPage() {
  const myBids = [
    {
      id: 1,
      auctionName: "Ayam Kampung Super Grade A",
      image: "/placeholder.svg?height=60&width=60",
      myBid: "Rp 85.000",
      currentBid: "Rp 85.000",
      status: "winning",
      timeLeft: "2 jam 15 menit",
      bidTime: "2 jam yang lalu",
    },
    {
      id: 2,
      auctionName: "Ayam Petelur Unggul Produktif",
      image: "/placeholder.svg?height=60&width=60",
      myBid: "Rp 90.000",
      currentBid: "Rp 95.000",
      status: "outbid",
      timeLeft: "1 jam 45 menit",
      bidTime: "3 jam yang lalu",
    },
    {
      id: 3,
      auctionName: "Ayam Broiler Premium",
      image: "/placeholder.svg?height=60&width=60",
      myBid: "Rp 60.000",
      currentBid: "Rp 65.000",
      status: "outbid",
      timeLeft: "4 jam 30 menit",
      bidTime: "1 hari yang lalu",
    },
    {
      id: 4,
      auctionName: "Ayam Jago Bangkok",
      image: "/placeholder.svg?height=60&width=60",
      myBid: "Rp 100.000",
      currentBid: "Rp 120.000",
      status: "lost",
      timeLeft: "Berakhir",
      bidTime: "2 hari yang lalu",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "winning":
        return <Badge className="bg-green-500 text-white">Menang</Badge>
      case "outbid":
        return <Badge className="bg-yellow-500 text-white">Tersalip</Badge>
      case "lost":
        return <Badge className="bg-red-500 text-white">Kalah</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "winning":
        return <Trophy className="w-4 h-4 text-green-500" />
      case "outbid":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "lost":
        return <X className="w-4 h-4 text-red-500" />
      default:
        return <Gavel className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center p-4">
          <BackButton fallbackHref="/profile" />
          <h1 className="text-lg font-bold text-gray-900 flex-1">My Bids</h1>
        </div>
      </div>

      {/* Bids List */}
      <div className="p-4">
        <div className="space-y-4">
          {myBids.map((bid) => (
            <Card key={bid.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <img
                    src={bid.image || "/placeholder.svg"}
                    alt={bid.auctionName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{bid.auctionName}</h3>
                      {getStatusBadge(bid.status)}
                    </div>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Bid saya:</span>
                        <span className="font-medium text-orange-600">{bid.myBid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bid tertinggi:</span>
                        <span className="font-medium">{bid.currentBid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Waktu tersisa:</span>
                        <span className={bid.timeLeft === "Berakhir" ? "text-red-500" : "text-gray-600"}>
                          {bid.timeLeft}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(bid.status)}
                        <span className="text-xs text-gray-500">{bid.bidTime}</span>
                      </div>
                      {bid.status === "outbid" && bid.timeLeft !== "Berakhir" && (
                        <button className="text-xs text-orange-600 font-medium">Bid Lagi</button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {myBids.length === 0 && (
          <div className="text-center py-12">
            <Gavel className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Belum ada riwayat bid</p>
            <p className="text-sm text-gray-400">Mulai ikut lelang untuk melihat riwayat di sini</p>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  )
}
