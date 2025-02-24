import type { UUID } from "crypto";
import type { MemberCollection } from "@/types/dashboard/view";

import * as React from "react";
import Link from "next/link";
import { Progress, Tooltip } from "antd";
import Image from "next/image";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDuration, formatDateTimeToLocal } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateToolTipT } from "@/components/collection/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/collection/status-badge";
import { cn } from "@/lib/utils";
import { getProgressColor } from "@/lib/utils_components";

export const CollectionCard = ({
  className,
  collections,
  onExplore,
}: {
  className?: string;
  collections: MemberCollection[];
  onExplore: (value: UUID) => void;
}) => {
  return (
    <>
      {collections.map((metadata) => {
        const current_collection_progress = () => {
          if (metadata.days_taken >= metadata["collection"].alloted_time) {
            return (
              (metadata["collection"].alloted_time / metadata.days_taken) * 100
            );
          }

          return (
            (metadata.days_taken / metadata["collection"].alloted_time) * 100
          );
        };

        const current_collection_delay_progress = () => {
          if (metadata.days_taken >= metadata["collection"].alloted_time) {
            return 100;
          }

          return 0;
        };

        const getToolTip = () => {
          if (metadata.days_taken >= metadata["collection"].alloted_time) {
            return `You have took ${metadata.due_time} days extra`;
          }

          return `You have used ${metadata.days_taken} out of ${metadata["collection"].alloted_time}`;
        };

        const foramtProgress = (
          _percent?: number,
          _successPercent?: number,
        ) => {
          return (
            <span
              className={
                metadata.days_taken >= metadata["collection"].alloted_time
                  ? "text-red-500"
                  : "text-blue-500"
              }
            >
              {metadata.days_taken}/{metadata["collection"].alloted_time}
            </span>
          );
        };

        return (
          <Card
            key={metadata["collection"].id}
            className={cn(
              "md:max-w-[300px] lg:max-w-[350px] p-0 rounded-xl flex-grow relative flex flex-col",
              className,
            )}
          >
            <CardHeader
              className={cn(
                "rounded-t-xl h-[120px] w-full bg-neutral-300/30 dark:bg-neutal-700/30 rounded-xl p-0 relative",
                !metadata["collection"].image &&
                  "bg-gradient-to-r from-primary-600/80 to-primary-400/60 overflow-hidden",
              )}
            >
              {metadata["collection"].image ? (
                <Image
                  alt={metadata["collection"].title}
                  className="pointer-events-none z-10 w-full object-cover h-full rounded-xl opacity-70"
                  fill={true}
                  src={
                    (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
                    metadata["collection"].image
                  }
                />
              ) : (
                <div className="w-full h-full flex gap-5 flex-wrap text-gray-100">
                  {Array.from({ length: 20 }).map((_, index) => (
                    <span
                      key={index}
                      className="opacity-30 pointer-events-none selection:not-sr-only
                        -rotate-[30deg]
                      "
                    >
                      {metadata["collection"].title.split(" ")[0]}
                    </span>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4 h-max">
              <CardTitle className="z-20">
                <button
                  className="text-2xl hover:underline"
                  onClick={() => onExplore(metadata["collection"].id)}
                >
                  {metadata["collection"].title}
                </button>
              </CardTitle>
              <p className="line-clamp-5 text-xs text-gray-700">
                {metadata["collection"].description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-2 justify-between flex-grow">
              <div className="flex flex-col gap-1 flex-grow w-full">
                <div className="flex flex-col items-start w-full px-2">
                  <span className="text-[12px] capitalize">
                    Course Progress
                  </span>
                  <Tooltip title="Your progress">
                    <Progress
                      className="w-full"
                      percent={metadata.progress}
                      strokeColor={getProgressColor(metadata.progress)}
                    />
                  </Tooltip>
                </div>
                <div className="flex flex-col items-start w-full px-2">
                  <span className="text-[12px] capitalize">Days spent</span>
                  <Tooltip title={getToolTip()}>
                    <Progress
                      format={foramtProgress}
                      percent={current_collection_delay_progress()}
                      status="exception"
                      success={{
                        percent: current_collection_progress(),
                        strokeColor: "#496cf5",
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Alloted time:</strong>&nbsp;
                    {String(metadata["collection"].alloted_time)} days
                  </p>
                  <p>
                    <strong>Content length:</strong>&nbsp;
                    {formatDuration(metadata["collection"].duration as string)}
                  </p>
                </div>
                <CreateToolTipT
                  content="Explore"
                  trigger={
                    <Button
                      onClick={() => onExplore(metadata["collection"].id)}
                    >
                      Explore
                    </Button>
                  }
                />
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export const CollectionCourseView = ({
  metadata,
  started_courses,
}: {
  metadata?: MemberCollection;
  started_courses: Record<string, number> | null;
}) => {
  if (!metadata) {
    <>No Data</>;
  }

  const started_course_list = Object.keys(started_courses || {});

  return (
    <div className="flex flex-col gap-4 h-[90%]">
      <div className="bg-neutral-300/30 p-2 rounded-small flex flex-col gap-1">
        <div className="w-full text-sm">
          <p>
            <strong>Started on:</strong>
            &nbsp;
            {formatDateTimeToLocal(metadata?.started_on as string) ||
              "Not started yet"}
          </p>
          <p>
            <strong>Estimated completion date:</strong>
            &nbsp;
            {formatDateTimeToLocal(
              metadata?.estimated_completion_date as string,
            ) || "Not started yet"}
          </p>
          <p>
            <strong>Completed on:</strong>
            &nbsp;
            {formatDateTimeToLocal(metadata?.completed_on as string) ||
              "Not started yet"}
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
                  started_courses?.[course.id] == 100
                    ? "completed"
                    : started_course_list.includes(course.id)
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
            <div className="w-full flex gap-2 items-center justify-between">
              <Progress
                className="flex-grow"
                percent={started_courses?.[course.id] || 0}
                status={
                  started_courses?.[course.id] != 100 ? "active" : undefined
                }
                strokeColor={
                  !(started_courses?.[course.id] == 100)
                    ? getProgressColor(started_courses?.[course.id] ?? 0)
                    : undefined
                }
              />
            </div>
            <CreateToolTipT
              content="View Course"
              trigger={
                <Link
                  className={cn(buttonVariants(), "w-full")}
                  href={`/dashboard/courses/${metadata?.collection.id}?course=${course.id}`}
                >
                  View Course
                </Link>
              }
            />
          </CardFooter>
        </Card>
      ))}
    </div>
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
