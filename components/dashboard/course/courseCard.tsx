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
  course,
}: {
  className?: string;
  openCourse: () => void;
  setOpenCourseID: (id: UUID) => void;
  course: Course;
}) {
  function handleCourseView() {
    setOpenCourseID(course.id);
    openCourse();
  }

  return (
    <Card className={cn("dark:bg-neutral-800 flex flex-col", className)}>
      <CardHeader className="relative rounded-t-xl min-h-[120px] w-full bg-neutral-300/30 dark:bg-neutal-700/30">
        <img
          alt={course.title}
          className="absolute top-0 left-0 pointer-events-none z-10 w-full object-cover h-full rounded-xl opacity-30"
          src="https://www.atakinteractive.com/hs-fs/hubfs/react%2010.jpg?width=1200&height=600&name=react%2010.jpg"
          // src={
          //   (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
          //   metadata["collection"].image
          // }
        />
        <CardTitle className="z-20">
          <h3 
            className="text-2xl hover:underline cursor-pointer max-w-fit mr-4"
            onClick={handleCourseView}
          >
            {course.title}
          </h3>
        </CardTitle>
        <CardOptions courseId={course.id} viewAction={handleCourseView} />
      </CardHeader>
      <CardContent className="flex-grow space-y-4 p-4">
        <p className="line-clamp-3 overflow-y-scroll no-scrollbar text-base">
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
  courseId,
  viewAction,
}: {
  courseId: UUID;
  viewAction: () => void;
}) => {
  return (
    <div className="absolute top-0 right-0 p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 p-0" variant="ghost">
            <span className="sr-only">Open menu</span>
            <HiDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={viewAction}>View</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
