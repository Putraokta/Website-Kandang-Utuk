"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/ui/back-button"
import { Send, Paperclip, Phone, MoreVertical, Star, Clock, CheckCheck, Check, ShoppingBag, Gavel } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: string
  status: "sent" | "delivered" | "read"
  type: "text" | "product" | "auction" | "image"
  productInfo?: {
    id: string
    name: string
    image: string
    price?: number
    currentBid?: number
  }
  imageUrl?: string
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastSeen?: string
  rating: number
  responseTime: string
  type: "seller" | "auction"
}

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample chat user data
  const chatUser: ChatUser = {
    id: params.id,
    name: params.id === "1" ? "Toko Pakan Jaya" : "Pak Budi Farm",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    rating: 4.9,
    responseTime: "< 1 jam",
    type: params.id === "1" ? "seller" : "auction",
  }

  // Sample messages
  const initialMessages: Message[] = [
    {
      id: "1",
      text: "Selamat siang, ada yang bisa saya bantu?",
      sender: "other",
      timestamp: "10:30",
      status: "read",
      type: "text",
    },
    {
      id: "2",
      text: "Halo, saya mau tanya tentang produk jagung ayam",
      sender: "user",
      timestamp: "10:32",
      status: "read",
      type: "text",
    },
    {
      id: "3",
      text: "Baik pak, ini produk yang dimaksud:",
      sender: "other",
      timestamp: "10:33",
      status: "read",
      type: "text",
    },
    {
      id: "4",
      text: "",
      sender: "other",
      timestamp: "10:33",
      status: "read",
      type: "product",
      productInfo: {
        id: "1",
        name: "Jagung Ayam Premium Grade A",
        image: "/placeholder.svg?height=60&width=60",
        price: 15000,
      },
    },
    {
      id: "5",
      text: "Stoknya masih ada berapa kg?",
      sender: "user",
      timestamp: "10:35",
      status: "read",
      type: "text",
    },
    {
      id: "6",
      text: "Masih banyak pak, sekitar 500kg. Mau order berapa?",
      sender: "other",
      timestamp: "10:36",
      status: "delivered",
      type: "text",
    },
  ]

  useEffect(() => {
    setMessages(initialMessages)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: "user",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
        type: "text",
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate typing indicator
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)

        // Simulate auto-reply
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Terima kasih pesannya, akan saya respon secepatnya.",
          sender: "other",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          status: "sent",
          type: "text",
        }
        setMessages((prev) => [...prev, autoReply])
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const imageMessage: Message = {
        id: Date.now().toString(),
        text: "",
        sender: "user",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
        type: "image",
        imageUrl: URL.createObjectURL(file),
      }
      setMessages([...messages, imageMessage])
    }
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <BackButton fallbackHref="/chat" />
            <div className="relative">
              <img
                src={chatUser.avatar || "/placeholder.svg"}
                alt={chatUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {chatUser.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-medium text-gray-900">{chatUser.name}</h1>
                <div className="flex items-center space-x-1">
                  {chatUser.type === "seller" ? (
                    <ShoppingBag className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Gavel className="w-4 h-4 text-purple-500" />
                  )}
                  <Badge
                    variant="outline"
                    className={`text-xs ${chatUser.type === "seller" ? "text-blue-600" : "text-purple-600"}`}
                  >
                    {chatUser.type === "seller" ? "Penjual" : "Lelang"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{chatUser.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{chatUser.responseTime}</span>
                </div>
                <span>{chatUser.isOnline ? "Online" : chatUser.lastSeen}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md ${msg.sender === "user" ? "order-2" : "order-1"}`}>
              {msg.type === "text" && (
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.sender === "user" ? "bg-orange-500 text-white" : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              )}

              {msg.type === "product" && msg.productInfo && (
                <Card className="w-full max-w-xs">
                  <CardContent className="p-3">
                    <div className="flex space-x-3">
                      <img
                        src={msg.productInfo.image || "/placeholder.svg"}
                        alt={msg.productInfo.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{msg.productInfo.name}</h4>
                        {msg.productInfo.price && (
                          <p className="text-orange-500 font-bold text-sm mt-1">{formatPrice(msg.productInfo.price)}</p>
                        )}
                        {msg.productInfo.currentBid && (
                          <p className="text-purple-500 font-bold text-sm mt-1">
                            Bid: {formatPrice(msg.productInfo.currentBid)}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-orange-500 hover:bg-orange-600">
                      Lihat Detail
                    </Button>
                  </CardContent>
                </Card>
              )}

              {msg.type === "image" && msg.imageUrl && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={msg.imageUrl || "/placeholder.svg"}
                    alt="Shared image"
                    className="max-w-xs max-h-64 object-cover"
                  />
                </div>
              )}

              <div
                className={`flex items-center space-x-1 mt-1 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
                {msg.sender === "user" && getMessageStatusIcon(msg.status)}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={handleFileUpload} className="flex-shrink-0">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </Button>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="flex-shrink-0 bg-orange-500 hover:bg-orange-600"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  )
}
