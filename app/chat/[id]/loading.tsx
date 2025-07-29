import { ChatMessageSkeleton } from "@/components/skeletons/chat-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            <Skeleton className="w-6 h-6 mr-4" />
            <Skeleton className="w-12 h-12 rounded-full mr-3" />
            <div className="flex-1">
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Messages Area Skeleton */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 lg:px-8 py-6">
        <ChatMessageSkeleton />
      </div>

      {/* Input Area Skeleton */}
      <div className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-end space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="flex-1 h-12 rounded-lg" />
            <Skeleton className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
