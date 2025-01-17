"use client";

import React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
// API
import { cn } from "@/lib/utils";

const traineeActivity = ({ className }: { className?: string }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">User activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
            <Skeleton className="h-10 w-full" />
            <Separator />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default traineeActivity;
