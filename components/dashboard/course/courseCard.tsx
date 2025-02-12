/* eslint-disable @next/next/no-img-element */
import type { Course } from "@/types/dashboard/view";
import type { UUID } from "crypto";

import { HiDotsVertical } from "react-icons/hi";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

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
          "relative rounded-t-xl min-h-[120px] w-full bg-neutral-300/30 dark:bg-neutal-700/30 rounded-xl",
          !course.image && "bg-primary-200",
        )}
      >
        {course.image && (
          <img
            alt={course.title}
            className="absolute top-0 left-0 pointer-events-none z-10 w-full object-cover h-full rounded-xl opacity-30"
            src={(process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") + course.image}
          />
        )}
        <CardTitle className="z-20">
          <button
            className="text-2xl hover:underline cursor-pointer max-w-fit mr-4"
            onClick={handleCourseView}
          >
            {course.title}
          </button>
        </CardTitle>
        <CardOptions
          courseID={course.id}
          handleDeleteAction={handleDeleteAction}
          handleEditAction={handleEditAction}
        />
      </CardHeader>
      <CardContent className="flex-grow space-y-4 p-4">
        <p className="line-clamp-3 overflow-y-scroll no-scrollbar text-sm text-neutral-500">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between w-full">
        <div className="w-full flex flex-wrap gap-2">
          {course.collections.map((collection, index) => (
            <Link
              key={`${index}-${collection.id}`}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium border 
                  bg-primary-100 text-primary-800 border-primary-300"
              href={`/dashboard/collections/${collection.id}`}
            >
              {collection.title}
            </Link>
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
            className="h-8 w-8 p-0 hover:bg-primary-300 rounded-full hover:text-white"
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
