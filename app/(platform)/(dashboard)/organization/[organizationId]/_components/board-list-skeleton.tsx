import { Skeleton } from "@/components/ui/skeleton";

const BoardListSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} className="aspect-video bg-white h-full w-full p-2" />
    ))}
  </div>
);

export default BoardListSkeleton;
