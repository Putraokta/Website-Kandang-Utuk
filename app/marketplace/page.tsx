"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Search, Filter, ArrowLeft, ShoppingCart, User, Home, Heart, Plus } from "lucide-react"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartCount, setCartCount] = useState(3)

  const categories = [
    { id: "all", name: "Semua" },
    { id: "anakan", name: "Anakan" },
    { id: "jantan", name: "Jantan" },
    { id: "betina", name: "Betina" },
  ]

  const products = [
    {
      id: "1",
      name: "Kaolan x Shadow (Jantan)",
      price: "Rp 2.500.000",
      image: "/1.jpg?height=200&width=200",
      rating: 4.5,
      sold: 150,
      category: "jantan",
    },
    {
      id: "2",
      name: "Ninja x Shadow F2 (Betina)",
      price: "Rp 2.000.000",
      image: "/2.jpg?height=200&width=200",
      rating: 4.8,
      sold: 89,
      category: "betina",
    },
    {
      id: "3",
      name: "Line Pajero (Anakan)",
      price: "Rp 500.000",
      image: "/3.jpg?height=200&width=200",
      rating: 4.3,
      sold: 203,
      category: "anakan",
    },
    {
      id: "4",
      name: "Kaolan x DePanther (Jantan)",
      price: "Rp 5.000.000",
      image: "/4.jpg?height=200&width=200",
      rating: 4.6,
      sold: 175,
      category: "jantan",
    },
    {
      id: "5",
      name: "Blackbull (Jantan)",
      price: "Rp 3.000.000",
      image: "/5.jpg?height=200&width=200",
      rating: 4.7,
      sold: 298,
      category: "jantan",
    },
    {
      id: "6",
      name: "Bima SN x Blackdragon (Anakan Jantan)",
      price: "Rp 1.000.000",
      image: "/6.jpg?height=200&width=200",
      rating: 4.4,
      sold: 156,
      category: "anakan",
    },
    {
      id: "7",
      name: "Bima SN x Blackdragon (Anakan Betina)",
      price: "Rp 800.000",
      image: "/7.jpg?height=200&width=200",
      rating: 4.5,
      sold: 67,
      category: "anakan",
    },
    {
      id: "8",
      name: "Pajero x Blackdragon (Jantan)",
      price: "Rp 3.000.000",
      image: "/8.jpg?height=200&width=200",
      rating: 4.2,
      sold: 134,
      category: "jantan",
    },
    {
      id: "9",
      name: "Blackdragon x Blackbull (Jantan)",
      price: "Rp 10.000.000",
      image: "/9.jpg?height=200&width=200",
      rating: 4.6,
      sold: 89,
      category: "jantan",
    },
    {
      id: "10",
      name: "Pajero Jr (Jantan)",
      price: "Rp 5.000.000",
      image: "/10.jpg?height=200&width=200",
      rating: 4.9,
      sold: 45,
      category: "jantan",
    },
    {
      id: "11",
      name: "Blackbull (Betina)",
      price: "Rp 2.000.000",
      image: "/11.jpg?height=200&width=200",
      rating: 4.4,
      sold: 156,
      category: "betina",
    },
    {
      id: "12",
      name: "Line Blackdragon (Anakan)",
      price: "Rp 500.000",
      image: "/12.jpg?height=200&width=200",
      rating: 4.5,
      sold: 67,
      category: "anakan",
    },
    // Add more products as needed  
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (productId: string) => {
    setCartCount(cartCount + 1)
    console.log(`Added product ${productId} to cart`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <Link href="/home" className="lg:hidden">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-lg lg:text-2xl font-bold text-gray-900">Marketplace</h1>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Filter className="w-6 h-6 text-gray-600 cursor-pointer" />
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex space-x-2 lg:space-x-4 py-4 overflow-x-auto">
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
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-3 lg:p-4">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <h4 className="font-medium text-sm lg:text-base text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {product.name}
                  </h4>

                  <p className="text-orange-500 font-bold text-base lg:text-lg mb-2">{product.price}</p>

                  <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>{product.sold} terjual</span>
                  </div>
                </Link>

                <Button
                  size="sm"
                  onClick={() => addToCart(product.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-xs lg:text-sm py-2 h-8 lg:h-10"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  Keranjang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-xl text-gray-500 mb-2">Produk tidak ditemukan</p>
            <p className="text-gray-400">Coba kata kunci lain</p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <Link href="/home" className="flex flex-col items-center py-2 px-3 text-gray-500">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Beranda</span>
          </Link>

          <button className="flex flex-col items-center py-2 px-3 text-orange-500">
            <ShoppingCart className="w-6 h-6 mb-1" />
            <span className="text-xs">Marketplace</span>
          </button>

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

      {/* Add bottom padding for mobile */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
