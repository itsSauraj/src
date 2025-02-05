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
import { cn } from "@/lib/utils";

export default function CourseCard({
  className,
  openCourse,
  setOpenCourseID,
  setDeleteCourseID,
  course,
}: {
  className?: string;
  openCourse: () => void;
  setOpenCourseID: (id: UUID) => void;
  setDeleteCourseID: (id: UUID) => void;
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
          <h3
            className="text-2xl hover:underline cursor-pointer max-w-fit mr-4"
            onClick={handleCourseView}
          >
            {course.title}
          </h3>
        </CardTitle>
        <CardOptions
          courseID={course.id}
          setDeleteCourseID={setDeleteCourseID}
        />
      </CardHeader>
      <CardContent className="flex-grow space-y-4 p-4">
        <p className="line-clamp-3 overflow-y-scroll no-scrollbar text-sm text-neutral-500">
          {course.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-end w-full">
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
  setDeleteCourseID,
}: {
  courseID: UUID;
  setDeleteCourseID: (id: UUID) => void;
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
        break;
      case "delete":
        setDeleteCourseID(courseID);
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
