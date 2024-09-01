import { Skeleton } from "@/components/ui/skeleton";
export function CourseCardSkeleton() {
  return (
    <div className="shadow-sm rounded-lg overflow-hidden transform ">
      {/* Skeleton for Card Image */}
      <Skeleton className="w-full h-[100px] object-cover" />
      {/* Skeleton for Card Content */}
      <div className="p-4 bg-white">
        {/* Skeleton for Title */}
        <Skeleton className="h-6 w-[70%] mb-4" />
        {/* Skeleton for Tag-Like Effects */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Skeleton for Chapters */}
          <Skeleton className="h-6 w-[100px] rounded-full" />
          {/* Skeleton for Course Level */}
          <Skeleton className="h-6 w-[80px] rounded-full" />
        </div>
        {/* Skeleton for Course Category */}
        <Skeleton className="h-6 w-[120px] rounded-full" />
      </div>
    </div>
  );
}
