import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-12">
      {/* Hero skeleton */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-border bg-card p-8">
        <div className="space-y-4 max-w-lg flex-1">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-10 w-3/4 rounded-xl" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
        <Skeleton className="size-60 rounded-3xl" />
      </div>

      {/* Grid skeletons */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-48 rounded-md" />
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
    </div>
  );
}

