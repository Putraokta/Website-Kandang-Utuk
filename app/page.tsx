"use client"

import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    // Redirect langsung ke halaman login
    window.location.href = "/login"
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Mengarahkan ke halaman login...</p>
      </div>
    </div>
  )
}
