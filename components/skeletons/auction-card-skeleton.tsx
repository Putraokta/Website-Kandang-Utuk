import { Skeleton } from "@/components/ui/skeleton"

export function AuctionCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full aspect-square" />
        <div className="absolute top-2 left-2">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  )
}
