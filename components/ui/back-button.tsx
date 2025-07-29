"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  fallbackHref?: string
  className?: string
  showText?: boolean
}

export function BackButton({ fallbackHref = "/", className = "", showText = false }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to specific route if no history
      router.push(fallbackHref)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`p-2 hover:bg-gray-100 rounded-full ${className}`}
    >
      <ArrowLeft className="w-6 h-6 text-gray-600" />
      {showText && <span className="ml-2">Kembali</span>}
    </Button>
  )
}
