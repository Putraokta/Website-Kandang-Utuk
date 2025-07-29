import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            <Skeleton className="w-6 h-6 mr-4" />
            <Skeleton className="w-32 h-6" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Search and Filter Skeleton */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <Skeleton className="h-6 w-20 mb-4" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-10 h-10" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
