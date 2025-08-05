"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Heart,
  Share2,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Shield,
  MessageCircle,
  MapPin,
  Clock,
  Home,
  User,
} from "lucide-react"
import { BackButton } from "@/components/ui/back-button"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviewCount: number
  sold: number
  description: string
  specifications: { [key: string]: string }
  seller: {
    name: string
    avatar: string
    rating: number
    location: string
    responseTime: string
    joinDate: string
    id?: string
  }
  shipping: {
    cost: number
    estimatedDays: string
    methods: string[]
  }
  stock: number
  category: string
  tags: string[]
}

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  comment: string
  images?: string[]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  // Sample product data
  const product: Product = {
    id: params.id,
    name: "Kaolan x Shadow (Jantan)",
    price: 2500000,
    originalPrice: 3000000,
    images: [
      "/1.jpg?height=400&width=400",
      "/1.jpg?height=400&width=400",
      "/1.jpg?height=400&width=400",
    ],
    rating: 4.8,
    reviewCount: 127,
    sold: 1250,
    description:
      " Ayam Kaolan x Shadow adalah jenis ayam unggul yang dikenal karena ketahanan dan kualitas daya tarungnya. Dikenal sebagai ayam petarung yang tangguh, mereka memiliki postur tubuh yang kuat dan otot yang terlatih. Ayam ini memiliki bulu yang indah dengan kombinasi warna yang menarik, serta mata yang tajam dan ekspresif. Dengan sifatnya yang agresif dan semangat juang yang tinggi, Ayam Kaolan x Shadow menjadi pilihan utama bagi para pecinta ayam petarung.",
    specifications: {
      Berat: "2,8 kg",
      Jenis: "Mangon",
      Asal: "Kandang Utuk Farm",
      "Usia Ayam": "8-12 bulan",
      Pengiriman: "Box",
    },
    seller: {
      name: "Kandang Utuk",
      avatar: "/seller1.png?height=60&width=60",
      rating: 4.9,
      location: "Kebumen, Jawa Tengah",
      responseTime: "< 1 jam",
      joinDate: "2020",
      id: "1",
    },
    shipping: {
      cost: 15000,
      estimatedDays: "2-3 hari",
      methods: ["JNE Regular", "SiCepat", "J&T Express"],
    },
    stock: 150,
    category: "Pakan Ternak",
    tags: ["Limited Edition", "Grade A", "Terpercaya"],
  }

  const reviews: Review[] = [
    {
      id: 1,
      user: "Putra Pratama Okta Riano",
      avatar: "/Test1.jpg?height=40&width=40",
      rating: 5,
      date: "2 hari lalu",
      comment: "Ayam sangat sehat dan aktif. Daya tarungnya luar biasa! Pengiriman cepat dan aman.",
      images: ["/1.jpg?height=100&width=100"],
    },
    {
      id: 2,
      user: "Siti Aminah",
      avatar: "/Test2.jpg?height=40&width=40",
      rating: 5,
      date: "1 minggu lalu",
      comment: "Ayam sangat bagus, kualitas pakan sangat baik. Terima kasih Kandang Utuk!",
    },
    {
      id: 3,
      user: "Jefri Nichole",
      avatar: "/Test3.jpg?height=40&width=40",
      rating: 4,
      date: "2 minggu lalu",
      comment: "Ayam sangat sesuai deskripsi. Hanya saja pengiriman sedikit terlambat. Namun, kualitasnya memuaskan.",
    },
  ]
  
  

  const relatedProducts = [
    {
      id: "2",
      name: "Ninja x Shadow (Betina)",
      price: 2000000,
      image: "/2.jpg?height=200&width=200",
      rating: 4.7,
      sold: 89,
    },
    {
      id: "3",
      name: "Line Pajero (Anakan)",
      price: 500000,
      image: "/3.jpg?height=200&width=200",
      rating: 4.5,
      sold: 203,
    },
    {
      id: "4",
      name: "Kaolan x DePan (Jantan)",
      price: 5000000,
      image: "/4.jpg?height=200&width=200",
      rating: 4.6,
      sold: 175,
    },
    {
      id: "5",
      name: "Bima SN x Blackdragon (Jantan)",
      price: 1000000,
      image: "/5.jpg?height=200&width=200",
      rating: 4.4,
      sold: 156,
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`)
    alert(`${quantity} ${product.name} ditambahkan ke keranjang!`)
  }

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} of ${product.name}`)
    window.location.href = "/checkout"
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link produk disalin ke clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <BackButton fallbackHref="/marketplace" />
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">{product.name}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={toggleWishlist} className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className={`w-5 h-5 ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
              </button>
              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border">
              <img
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviewCount} ulasan)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-gray-500">{product.sold} terjual</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-orange-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-500">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">Per kg</p>
            </div>

            {/* Stock Info */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Stok:</span>
              <span className="font-medium text-gray-900">{product.stock} tersedia</span>
              {product.stock < 20 && (
                <Badge variant="destructive" className="text-xs">
                  Stok Terbatas
                </Badge>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <span className="text-gray-700 font-medium">Jumlah:</span>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-medium min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-500">
                  Subtotal: <span className="font-medium text-gray-900">{formatPrice(product.price * quantity)}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="h-12 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Keranjang
              </Button>
              <Button onClick={handleBuyNow} className="h-12 bg-orange-500 hover:bg-orange-600">
                Beli Sekarang
              </Button>
            </div>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Pengiriman</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ongkir:</span>
                      <span className="font-medium">{formatPrice(product.shipping.cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimasi:</span>
                      <span className="font-medium">{product.shipping.estimatedDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kurir:</span>
                      <span className="font-medium">{product.shipping.methods.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={product.seller.avatar || "/placeholder.svg"}
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{product.seller.name}</h3>
                      <Link href={`/chat/${product.seller.id || "1"}`}>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{product.seller.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{product.seller.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{product.seller.responseTime}</span>
                      </div>
                      <div>
                        <span>Bergabung {product.seller.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-8">
          <CardContent className="p-0">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                {[
                  { id: "description", label: "Deskripsi" },
                  { id: "specifications", label: "Spesifikasi" },
                  { id: "reviews", label: `Ulasan (${product.reviewCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-orange-500 text-orange-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>

                  <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Kualitas Terjamin</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Pengiriman Cepat</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium">Rating Tinggi</span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">Respon Cepat</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{product.rating}</div>
                      <div className="flex items-center justify-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{product.reviewCount} ulasan</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 w-8">{rating}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{
                                width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 2 : 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {rating === 5 ? 89 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-4">
                        <div className="flex items-start space-x-3">
                          <img
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.user}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{review.user}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 mb-3">{review.comment}</p>
                            {review.images && (
                              <div className="flex space-x-2">
                                {review.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image || "/placeholder.svg"}
                                    alt={`Review ${index + 1}`}
                                    className="w-16 h-16 rounded-lg object-cover border"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h4>
                    <p className="text-orange-500 font-bold text-base mb-2">{formatPrice(relatedProduct.price)}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{relatedProduct.rating}</span>
                      </div>
                      <span>{relatedProduct.sold} terjual</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
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

      {/* Add bottom padding for mobile */}
      <div className="lg:hidden h-20"></div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Keranjang
          </Button>
          <Button onClick={handleBuyNow} className="bg-orange-500 hover:bg-orange-600">
            Beli Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}
