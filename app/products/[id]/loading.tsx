export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center h-16 lg:h-20">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse mr-4"></div>
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/3 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white rounded-lg border">
          <div className="border-b p-6">
            <div className="flex space-x-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
