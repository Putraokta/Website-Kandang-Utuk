import { AuctionCardSkeleton } from "@/components/skeletons/auction-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            <Skeleton className="w-6 h-6 mr-4" />
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Hero Banner Skeleton */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 mb-8">
          <div className="text-center text-white">
            <Skeleton className="h-10 w-64 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-6 w-96 mx-auto mb-6 bg-white/20" />
            <Skeleton className="h-12 w-40 mx-auto bg-white/20" />
          </div>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Stats Bar Skeleton */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Auctions Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <AuctionCardSkeleton key={i} />
          ))}
        </div>

        {/* Load More Skeleton */}
        <div className="text-center mt-8">
          <Skeleton className="h-12 w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}
