import { Skeleton } from "@/components/ui/skeleton";

export function CollectionViewSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <div className="card shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full">
            <Skeleton className="h-8 w-52 rounded mb-2" />
            <div className="flex flex-col gap-1 w-[90%]">
              <Skeleton className="h-4 rounded" />
              <Skeleton className="h-4 rounded" />
              <Skeleton className="h-4 rounded w-[60%]" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md bg-red-200" />
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-4 flex flex-col items-end">
          <Skeleton className="h-8 w-36 rounded mb-4" />
          <Skeleton className="h-40 w-full rounded" />
        </div>
      </div>
    </div>
  );
}
