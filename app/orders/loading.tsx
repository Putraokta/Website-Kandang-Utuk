import { OrderCardSkeleton } from "@/components/skeletons/order-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            <Skeleton className="w-6 h-6 mr-4" />
            <Skeleton className="w-32 h-6" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        {/* Filter Tabs Skeleton */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-md" />
          ))}
        </div>

        {/* Orders List Skeleton */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
