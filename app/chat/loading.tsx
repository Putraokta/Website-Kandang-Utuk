import { ChatListSkeleton } from "@/components/skeletons/chat-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            <Skeleton className="w-6 h-6 mr-4" />
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-8 pb-4">
        <div className="max-w-4xl mx-auto pt-4">
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-8 py-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        </div>
      </div>

      {/* Chat List Skeleton */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        <ChatListSkeleton />
      </div>
    </div>
  )
}
