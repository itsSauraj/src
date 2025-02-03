import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const AdminSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <section className="flex w-full gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="min-h-[120px] rounded-xl flex-grow"
          />
        ))}
      </section>
      <section className="flex w-full gap-3">
        <Skeleton className="min-h-[400px] rounded-xl flex-grow" />
        <Skeleton className="min-h-[400px] rounded-xl flex-grow" />
      </section>
    </div>
  );
};

export { AdminSkeleton };
