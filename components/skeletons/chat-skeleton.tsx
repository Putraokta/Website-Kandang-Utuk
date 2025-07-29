import { Skeleton } from "@/components/ui/skeleton"

export function ChatListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border p-4">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-3/4" />
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-8 h-8 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            </div>
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChatMessageSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`flex ${i % 3 === 0 ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-xs lg:max-w-md space-y-2 ${i % 3 === 0 ? "items-end" : "items-start"} flex flex-col`}>
            <Skeleton className={`h-12 w-48 rounded-2xl ${i % 3 === 0 ? "rounded-br-md" : "rounded-bl-md"}`} />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}
