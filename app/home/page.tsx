"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import RoleAwareHeader from "@/components/navigation/role-aware-header"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const { user, isRole } = useAuth()

  const products = [
    {
      id: 1,
      name: "Kaolan x Shadow (Jantan)",
      price: "Rp 2.500.000",
      image: "/1.jpg?height=200&width=200",
      rating: 4.5,
      sold: 150,
    },
    {
      id: 2,
      name: "Ninja x Shadow F2 (Betina)",
      price: "Rp 2.000.000",
      image: "/2.jpg?height=200&width=200",
      rating: 4.8,
      sold: 89,
    },
    {
      id: 3,
      name: "Line Pajero (Anakan)",
      price: "Rp 500.000",
      image: "/3.jpg?height=200&width=200",
      rating: 4.3,
      sold: 203,
    },
    {
      id: 4,
      name: "Kaolan x DePanther (Jantan)",
      price: "Rp 5.000.000",
      image: "/4.jpg?height=200&width=200",
      rating: 4.6,
      sold: 175,
    },
    {
      id: 5,
      name: "Blackbull (Jantan)",
      price: "Rp 3.000.000",
      image: "/5.jpg?height=200&width=200",
      rating: 4.7,
      sold: 298,
    },
    {
      id: 6,
      name: "Bima SN x Blackdragon (Anakan)",
      price: "Rp 1.000.000",
      image: "/6.jpg?height=200&width=200",
      rating: 4.4,
      sold: 156,
    },
  ]

  const auctions = [
    {
      id: 1,
      name: "Bima SN x Blackdragon (Anakan)",
      currentBid: "Rp 1.000.000",
      timeLeft: "2 jam 15 menit",
      image: "/7.jpg?height=200&width=200",
      bidders: 12,
      startPrice: "Rp 250.000",
    },
    {
      id: 2,
      name: "Pajero x Blackdragon (Jantan)",
      currentBid: "Rp 3.000.000",
      timeLeft: "4 jam 30 menit",
      image: "/8.jpg?height=200&width=200",
      bidders: 8,
      startPrice: "Rp 500.000",
    },
    {
      id: 3,
      name: "Blackdragon x Blackbull (Jantan)",
      currentBid: "Rp 10.000.000",
      timeLeft: "1 jam 45 menit",
      image: "/9.jpg?height=200&width=200",
      bidders: 15,
      startPrice: "Rp 1.000.000",
    },
    {
      id: 4,
      name: "Pajero Jr (Jantan)",
      currentBid: "Rp 5.000.000",
      timeLeft: "6 jam 20 menit",
      image: "/10.jpg?height=200&width=200",
      bidders: 20,
      startPrice: "Rp 800.000",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Putra Pratama Okta Riano",
      avatar: "/Test1.jpg?height=60&width=60",
      rating: 5,
      comment:
        "Pelayanan sangat memuaskan, barang sampai dengan cepat dan kualitas sesuai ekspektasi. Sangat recommended!",
    },
    {
      id: 2,
      name: "Siti Aminah",
      avatar: "/Test2.jpg?height=60&width=60",
      rating: 5,
      comment: "Produk berkualitas tinggi dengan harga yang sangat kompetitif. Pasti akan order lagi!",
    },
  ]

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      window.location.href = "/login"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleAwareHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 lg:p-12 rounded-xl mb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-white font-bold text-2xl lg:text-4xl mb-4">
                {user ? `Selamat Datang, ${user.name}!` : "Kandang Utuk - Platform Terpercaya"}
              </h1>
              <h2 className="text-white font-bold text-xl lg:text-3xl mb-6">KANDANG UTUK</h2>
              <p className="text-white/90 text-lg mb-6">
                {isRole("farmer")
                  ? "Kelola produk dan lelang Anda dengan mudah"
                  : isRole("admin")
                    ? "Dashboard admin untuk mengelola platform"
                    : "Platform terpercaya untuk kebutuhan bahan pangan berkualitas tinggi"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {isRole("farmer") ? (
                  <>
                    <Link href="/farmer/products">
                      <Button className="bg-white text-orange-600 hover:bg-gray-100">Kelola Produk</Button>
                    </Link>
                    <Link href="/farmer/auctions">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-orange-600"
                      >
                        Buat Lelang
                      </Button>
                    </Link>
                  </>
                ) : isRole("admin") ? (
                  <>
                    <Link href="/admin/dashboard">
                      <Button className="bg-white text-orange-600 hover:bg-gray-100">Admin Dashboard</Button>
                    </Link>
                    <Link href="/admin/users">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-orange-600"
                      >
                        Kelola Users
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/marketplace">
                      <Button className="bg-white text-orange-600 hover:bg-gray-100">Jelajahi Marketplace</Button>
                    </Link>
                    <Link href="/auctions">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-orange-600"
                      >
                        Ikuti Lelang
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Marketplace</h3>
            <Link href="/marketplace" className="text-orange-500 font-medium hover:text-orange-600">
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-medium text-sm lg:text-base text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-orange-500 font-bold text-lg mb-3">{product.price}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>{product.sold} terjual</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pelelangan Ayam Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Pelelangan Ayam</h3>
            <Link href="/auctions" className="text-orange-500 font-medium hover:text-orange-600">
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {auctions.map((auction) => (
              <Card
                key={auction.id}
                className="overflow-hidden border-2 border-orange-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={auction.image || "/placeholder.svg"}
                      alt={auction.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-medium text-base text-gray-900 mb-3">{auction.name}</h4>
                  <div className="space-y-2 mb-4">
                    <p className="text-orange-500 font-bold text-lg">Bid: {auction.currentBid}</p>
                    <p className="text-gray-500 text-sm">Mulai: {auction.startPrice}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{auction.bidders} penawar</span>
                    <span className="text-red-500 font-medium">{auction.timeLeft}</span>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Ikut Lelang</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Testimoni Pelanggan</h3>
            <Link href="/testimonials" className="text-orange-500 font-medium hover:text-orange-600">
              Lihat Semua →
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="font-medium text-lg text-gray-900">{testimonial.name}</h4>
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{testimonial.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Add bottom padding for mobile */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
