"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Clock } from "lucide-react"

export default function SuccessPage() {
  const orderNumber = "ORD-2024-001234"
  const estimatedDelivery = "2-3 hari kerja"

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            {/* Success Animation */}
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              {/* Celebration elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -top-1 -right-3 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-100"></div>
              <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-300"></div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Success!</h1>
            <p className="text-gray-600 mb-6">
              Pesanan Anda telah berhasil dibuat dan sedang diproses. Kami akan mengirimkan notifikasi untuk update
              selanjutnya.
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-2 mb-3">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Detail Pesanan</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Pesanan:</span>
                  <span className="font-medium text-gray-900">{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimasi Pengiriman:</span>
                  <span className="font-medium text-gray-900">{estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-orange-600">Sedang Diproses</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Langkah Selanjutnya</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Kami akan memproses pesanan Anda</li>
                <li>• Notifikasi akan dikirim saat pesanan dikirim</li>
                <li>• Lacak pesanan di halaman "Pesanan Saya"</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/orders" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Lihat Pesanan Saya</Button>
              </Link>
              <Link href="/home" className="block">
                <Button variant="outline" className="w-full">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
