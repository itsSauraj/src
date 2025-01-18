"use client";

import type { StoreDispatch } from "@/redux/store";
import type { Course } from "@/types/dashboard/view";

import { UUID } from "crypto";

import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useDispatch } from "react-redux";

import CourseCard from "../../../components/dashboard/course/courseCard";
import ViewCourse from "../../../components/dashboard/course/view";

/* APIs */
import { getCourses } from "@/lib/api";
// compoenets
import { AddCouse } from "@/components/dashboard/forms";
import { AddDialog } from "@/components/collection/modal";
import { Button } from "@/components/ui/button";
import MyDrawer from "@/components/ui/next-drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CourseDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState(false);
  const [openCourseID, setOpenCourseID] = useState<UUID | null>(null);

  const dispatch = useDispatch<StoreDispatch>();

  const handleBackdropChange = () => {
    onOpen();
  };

  useEffect(() => {
    dispatch(getCourses()).then((data) => {
      setCourses(data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-[80svh]">
      <div className="flex justify-end">
        <AddDialog
          className="sm:min-w-[100svw] lg:min-w-[80svw]"
          description="Add a new mentor to your training group"
          setState={setOpen}
          state={open}
          title="Add Course"
        >
          <ScrollArea className="h-[70svh]">
            <div className="flex justify-center">
              <AddCouse setCourses={setCourses} setState={setOpen} />
            </div>
          </ScrollArea>
        </AddDialog>
      </div>
      {courses.length === 0 ? (
        <ScrollArea className="h-full">
          <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <>
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex justify-center p-3 max-h-[260px]"
                >
                  <CourseCard
                    className="min-w-full"
                    course={course}
                    openCourse={handleBackdropChange}
                    setOpenCourseID={setOpenCourseID}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
          <MyDrawer
            footer={
              <Button
                className="capitalize"
                color="primary"
                onClick={() => onOpenChange()}
              >
                Close
              </Button>
            }
            isOpen={isOpen}
            title="Course View"
            onOpenChange={onOpenChange}
          >
            <ViewCourse courseId={openCourseID as UUID} />
          </MyDrawer>
        </>
      )}
    </div>
  );
};

export default CourseDashboard;

export function SkeletonCard() {
  return (
    <div className="flex justify-center p-3">
      <Skeleton className="min-h-[200px] rounded-xl min-w-full" />
    </div>
  );
}
