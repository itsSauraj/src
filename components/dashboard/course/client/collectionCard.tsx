/* eslint-disable @next/next/no-img-element */
import type { MemberCollection } from "@/types/dashboard/view";
import type { UUID } from "crypto";

import * as React from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatDuration } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/collection/status-badge";
import { cn } from "@/lib/utils";

export const CollectionCard = ({
  collections,
  onExplore,
}: {
  collections: MemberCollection[];
  onExplore: (index: number) => void;
}) => {
  const cardData = collections.map((collection) => collection["collection"]);

  return (
    <>
      {cardData.map((collection, index) => (
        <Card
          key={collection.id}
          className="w-[350px] p-0 rounded-xl h-full flex flex-col"
        >
          <CardHeader className="relative rounded-t-xl min-h-[120px] w-full bg-neutral-300/30 dark:bg-neutal-700/30">
            {collection.image && (
              <img
                alt={collection.title}
                className="absolute top-0 left-0 pointer-events-none z-10 w-full object-cover h-full rounded-xl opacity-40"
                src={
                  (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
                  collection.image
                }
              />
            )}
            <CardTitle className="z-20">
              <h3 className="text-2xl">{collection.title}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-4">
            <Label className="text-xl">Description</Label>
            <p className="line-clamp-6 h-[6rem] overflow-y-scroll no-scrollbar">
              {collection.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-600">
              <p>
                <strong>Alloted time:</strong>&nbsp;{collection.alloted_time}{" "}
                hours
              </p>
              <p>
                <strong>Content length:</strong>&nbsp;
                {formatDuration(collection.duration as string)}
              </p>
            </div>
            <Button onClick={() => onExplore(index)}>Explore</Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export const CollectionCourseView = ({
  metadata,
  started_courses,
}: {
  metadata?: MemberCollection;
  started_courses: Record<string, (UUID | string)[]>;
}) => {
  if (!metadata) {
    <>No Data</>;
  }

  return (
    <>
      <div className="bg-neutral-300/30 p-2 rounded-small flex flex-col gap-1">
        <div className="w-full text-sm">
          <p>
            <strong>Started on:</strong>
            &nbsp;{metadata?.started_on || "Not started yet"}
          </p>
          <p>
            <strong>Completed on:</strong>
            &nbsp;{metadata?.completed_on || "Not started yet"}
          </p>
        </div>
      </div>
      {metadata?.collection.courses.map((course) => (
        <Card key={course.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <h3 className="flex-1">{course.title}</h3>
              <StatusBadge
                status={
                  started_courses[String(metadata.collection.id)].includes(
                    course.id,
                  )
                    ? "started"
                    : "not-started"
                }
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[50px]">
              <p>{course.description}</p>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex justify-start items-center flex-col gap-2">
            <div className="w-full">
              <p>
                <strong>Duration:</strong>&nbsp;
                {formatDuration(course.duration)}
              </p>
            </div>
            <Progress
              className="w-full"
              indicatorClassName="bg-green-600"
              value={50}
            />
            <Link
              className={cn(buttonVariants(), "w-full")}
              href={`/dashboard/courses/${course.id}`}
            >
              Get Started
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export const CollectionCardSkeleton = () => {
  return (
    <Card className="w-[350px] p-0 rounded-xl h-full flex flex-col">
      <CardHeader className="relative rounded-t-xl min-h-[120px] w-full">
        <Skeleton className="absolute top-0 left-0 w-full h-full rounded-xl" />
      </CardHeader>
      <CardContent className="flex-grow space-y-4 p-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <div className="w-[90%] flex flex-col gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-9 w-20" />
      </CardFooter>
    </Card>
  );
};
