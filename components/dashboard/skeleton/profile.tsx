import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UserProfileUpdateSkeleton = () => (
  <Card className="flex-1">
    <CardHeader>
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>
        <div>
          <Skeleton className="w-48 h-5 mb-2" />
          <Skeleton className="w-36 h-4" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </CardContent>
  </Card>
);
