"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, Home } from "lucide-react"

export default function PaymentSuccessPage() {
  const orderDetails = {
    orderNumber: "ORD-2024-001234",
    paymentMethod: "Transfer Bank BRI",
    amount: "Rp 275.000",
    status: "Menunggu Verifikasi",
    estimatedVerification: "1x24 jam",
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
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

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
            <p className="text-gray-600 mb-6">
              Bukti pembayaran Anda telah diterima dan sedang dalam proses verifikasi. Kami akan mengirimkan notifikasi
              setelah pembayaran dikonfirmasi.
            </p>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Ringkasan Pembayaran</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Pesanan:</span>
                  <span className="font-medium text-gray-900">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode Pembayaran:</span>
                  <span className="font-medium text-gray-900">{orderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Pembayaran:</span>
                  <span className="font-medium text-orange-600">{orderDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-yellow-600">{orderDetails.status}</span>
                </div>
              </div>
            </div>

            {/* Verification Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Proses Verifikasi</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pembayaran akan diverifikasi dalam {orderDetails.estimatedVerification}</li>
                <li>• Notifikasi akan dikirim via WhatsApp dan email</li>
                <li>• Pesanan akan diproses setelah pembayaran dikonfirmasi</li>
                <li>• Hubungi customer service jika ada pertanyaan</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/orders" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Lihat Status Pesanan</Button>
              </Link>
              <Link href="/home" className="block">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>

            {/* Contact Support */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Butuh bantuan?</p>
              <div className="flex space-x-4 justify-center">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  WhatsApp CS
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Live Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
