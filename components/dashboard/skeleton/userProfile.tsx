import React from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function UserProfileSkeleton({ className }: { className?: string }) {
  const fields = [
    "employee_id",
    "username",
    "first_name",
    "last_name",
    "email",
    "address",
    "birth_date",
    "phone_number",
    "joining_date",
  ];

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <Skeleton className="h-7 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4">
            {fields.map((field) => {
              const size = String(field.length * 12) + "px";

              return (
                <div key={field} className="space-y-2 px-1">
                  <Skeleton
                    className={cn("h-5")}
                    style={{
                      width: size,
                    }}
                  />
                  <Skeleton className="h-10 w-full" />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
