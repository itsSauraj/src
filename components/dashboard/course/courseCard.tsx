import type { Course } from "@/types/dashboard/view";

import { UUID } from "crypto";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  return (
    <Card className={cn("max-w-[400px]", className)}>
      <CardHeader className="flex gap-3">
        <Avatar name={course.title} />
        <div className="flex items-center">
          <p className="text-md">{course.title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="line-clamp-2">{course.description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          className="capitalize"
          color="primary"
          onClick={() => {
            setOpenCourseID(course.id);
            openCourse();
          }}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
