"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FarmerOnly } from "@/components/ui/role-guard"
import { BackButton } from "@/components/ui/back-button"
import Link from "next/link"
import { Plus, Search, Filter, Eye, Edit, Trash2, Package } from "lucide-react"

export default function FarmerProducts() {
  const products = [
    {
      id: 1,
      name: "Ayam Kampung Super",
      price: "Rp 85.000",
      stock: 25,
      sold: 12,
      status: "Aktif",
      image: "/placeholder.svg?height=100&width=100",
      category: "Ayam Hidup",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      name: "Ayam Broiler Premium",
      price: "Rp 65.000",
      stock: 0,
      sold: 8,
      status: "Habis",
      image: "/placeholder.svg?height=100&width=100",
      category: "Ayam Hidup",
      createdAt: "2024-01-08",
    },
    {
      id: 3,
      name: "Telur Ayam Kampung",
      price: "Rp 35.000",
      stock: 50,
      sold: 25,
      status: "Aktif",
      image: "/placeholder.svg?height=100&width=100",
      category: "Telur",
      createdAt: "2024-01-05",
    },
  ]

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Habis</span>
    }
    if (status === "Aktif") {
      return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Aktif</span>
    }
    return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Nonaktif</span>
  }

  return (
    <FarmerOnly fallback={<div>Access Denied</div>}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <BackButton />
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Produk Saya</h1>
                <p className="text-gray-600 mt-2">Kelola semua produk yang Anda jual</p>
              </div>
              <Link href="/farmer/products/new">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Cari produk..." className="pl-10" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">Kategori</Button>
                  <Button variant="outline">Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{product.category}</p>

                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="text-2xl font-bold text-green-600">{product.price}</div>
                            {getStatusBadge(product.status, product.stock)}
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Stok</p>
                              <p className="font-medium">{product.stock} unit</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Terjual</p>
                              <p className="font-medium">{product.sold} unit</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Dibuat</p>
                              <p className="font-medium">{product.createdAt}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Total Revenue</p>
                              <p className="font-medium text-green-600">
                                Rp{" "}
                                {(Number.parseInt(product.price.replace(/[^\d]/g, "")) * product.sold).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex lg:flex-col gap-2 mt-4 lg:mt-0">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Produk</h3>
                <p className="text-gray-600 mb-6">Mulai jual produk pertama Anda sekarang</p>
                <Link href="/farmer/products/new">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Produk Pertama
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </FarmerOnly>
  )
}
