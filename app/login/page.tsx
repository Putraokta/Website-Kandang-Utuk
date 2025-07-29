"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(email, password)
    success ? router.push("/home") : alert("Login gagal. Periksa email dan password Anda.")
  }

  const handleGoogleLogin = () => {
    window.location.href = "/home"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Branding Desktop */}
        <div className="hidden lg:flex flex-col items-center px-8 space-y-6">
          <div className="flex flex-col items-center mb-4">
            <div className="mx-auto">
              <Image
                src="/images/logo lelang.png"
                alt="Logo Kandang Utuk"
                width={160}
                height={160}
                priority
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Kandang Utuk</h1>
            <h2 className="text-3xl font-bold text-orange-600">Kebumen</h2>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed text-center max-w-md">
            Platform terpercaya untuk kebutuhan bahan pangan berkualitas. Bergabunglah dengan ribuan pelanggan yang telah mempercayai kami.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">1000+</div>
              <div className="text-sm text-gray-600">Produk</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">5000+</div>
              <div className="text-sm text-gray-600">Pelanggan</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-6 pt-8">
              {/* Logo Mobile */}
              <div className="lg:hidden flex justify-center mb-4">
                <Image
                  src="/images/logo-lelang.png"
                  alt="Logo Kandang Utuk"
                  width={100}
                  height={100}
                  priority
                />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Selamat Datang!</h1>
              <p className="text-gray-600 mt-2">Masuk ke akun Anda untuk melanjutkan</p>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-8">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
                <p className="font-medium text-blue-800 mb-2">Demo Accounts:</p>
                <div className="space-y-1 text-blue-700">
                  <p>👤 Pembeli: buyer@test.com / buyer123</p>
                  <p>🌾 Peternak: farmer@test.com / farmer123</p>
                  <p>⚙️ Admin: admin@test.com / admin123</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "MASUK..." : "MASUK"}
                </Button>
              </form>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                  atau
                </span>
              </div>

              <Button variant="outline" className="w-full h-12" onClick={handleGoogleLogin}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..."
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57..."
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s..."
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15..."
                  />
                </svg>
                Masuk dengan Google
              </Button>

              <div className="text-center text-sm space-y-2">
                <div>
                  <span className="text-gray-600">Belum punya akun? </span>
                  <Link href="/register" className="text-orange-600 hover:underline font-medium">
                    Daftar Disini
                  </Link>
                </div>
                <div>
                  <Link href="/reset-password" className="text-orange-600 hover:underline">
                    Lupa Password?
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
