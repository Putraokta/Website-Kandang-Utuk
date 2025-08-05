import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kandang Utuk",
  description: "Platform marketplace dan lelang untuk kebutuhan peternak",
  generator: "v0.dev",
  icons: {
    icon: "/images/logo lelang.png", // atau "/logo.png" jika pakai PNG
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        {/* Untuk dukungan ekstra */}
        <link rel="icon" href="/images/logo lelang.png" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
