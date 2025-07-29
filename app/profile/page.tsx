import { ChevronRight, CreditCard, Gavel, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
        </div>
        <nav className="py-4">
          <div className="space-y-2">
            <Link href="/profile" className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-gray-900">My Account</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link href="/profile/bids" className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-900">My Bids</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link href="/profile/auctions" className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gavel className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium text-gray-900">Lelang Saya</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link href="/profile/settings" className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="font-medium text-gray-900">Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link href="/logout" className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-medium text-gray-900">Logout</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        <p>Welcome to your profile page!</p>
      </div>
    </div>
  )
}
