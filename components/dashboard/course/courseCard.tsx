/* eslint-disable @next/next/no-img-element */
import type { Course } from "@/types/dashboard/view";
import type { UUID } from "crypto";

import { HiDotsVertical } from "react-icons/hi";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkBadge } from "@/components/collection/status-badge";
import { cn } from "@/lib/utils";

export default function CourseCard({
  className,
  openCourse,
  setOpenCourseID,
  handleEditAction,
  handleDeleteAction,
  course,
}: {
  className?: string;
  openCourse: () => void;
  setOpenCourseID: (id: UUID) => void;
  handleEditAction: (id: UUID) => void;
  handleDeleteAction: (id: UUID) => void;
  course: Course;
}) {
  function handleCourseView() {
    setOpenCourseID(course.id);
    openCourse();
  }

  return (
    <Card className={cn("dark:bg-neutral-800 flex flex-col", className)}>
      <CardHeader
        className={cn(
          "rounded-t-xl h-[120px] w-full bg-neutral-300/30 dark:bg-neutal-700/30 rounded-xl p-0 relative",
          !course.image &&
            "bg-gradient-to-r from-primary-600/80 to-primary-400/60 overflow-hidden",
        )}
      >
        {course.image ? (
          <img
            alt={course.title}
            className="pointer-events-none z-10 w-full object-cover h-full rounded-xl opacity-70"
            src={(process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") + course.image}
          />
        ) : (
          <div className="w-full h-full flex gap-5 flex-wrap text-gray-100 items-center justify-center scale-105">
            {Array.from({ length: 30 }).map((_, index) => (
              <span
                key={index}
                className="opacity-30 pointer-events-none selection:not-sr-only
                  -rotate-[30deg] text-sm
                "
              >
                {course.title.split(" ")[0]}
              </span>
            ))}
          </div>
        )}
        <CardOptions
          courseID={course.id}
          handleDeleteAction={handleDeleteAction}
          handleEditAction={handleEditAction}
        />
      </CardHeader>
      <CardTitle className="z-20 text-left pt-2">
        <button
          className="text-xl hover:underline cursor-pointer max-w-fit mr-4 text-left px-4"
          onClick={handleCourseView}
        >
          {course.title}
        </button>
      </CardTitle>
      <CardContent className="flex-grow px-4">
        <p className="line-clamp-3 overflow-y-scroll no-scrollbar text-sm text-neutral-500">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between w-full">
        <div className="w-full flex flex-wrap gap-2">
          {course.collections.map((collection, index) => (
            <LinkBadge
              key={`${index}-${collection.id}`}
              href={`/dashboard/collections/${collection.id}`}
              value={collection.title}
            />
          ))}
        </div>
        <Button
          className="p-0 h-max"
          variant="ghost"
          onClick={handleCourseView}
        >
          <FaArrowUpRightFromSquare size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
}

const CardOptions = ({
  courseID,
  handleEditAction,
  handleDeleteAction,
}: {
  courseID: UUID;
  handleEditAction: (id: UUID) => void;
  handleDeleteAction: (id: UUID) => void;
}) => {
  const actionItems = [
    {
      name: "Edit",
      action: "edit",
    },
    {
      name: "Delete",
      action: "delete",
    },
  ];

  const handleAction = (action: string) => {
    switch (action) {
      case "edit":
        handleEditAction(courseID);
        break;
      case "delete":
        handleDeleteAction(courseID);
        break;
    }
  };

  return (
    <div className="absolute top-0 right-0 p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-8 w-8 p-0 rounded-lg hover:bg-white"
            variant="ghost"
          >
            <span className="sr-only">Open menu</span>
            <HiDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actionItems.map((item) => (
            <DropdownMenuItem
              key={item.action}
              onClick={() => handleAction(item.action)}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
