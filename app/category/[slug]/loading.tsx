import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div className="space-y-6">
      {/* Category Header Skeleton */}
      <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-6 shadow-2xs">
        <Skeleton className="size-14 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
      </div>

      {/* Sort Filter Skeleton */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
        <Skeleton className="h-5 w-36 rounded-md" />
        <Skeleton className="h-9 w-40 rounded-xl" />
      </div>

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-4 h-36"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-16 rounded-md" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

