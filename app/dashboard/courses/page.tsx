"use client";

import type { StoreDispatch } from "@/redux/store";
import type { Course } from "@/types/dashboard/view";

import { UUID } from "crypto";

import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useDispatch } from "react-redux";

import CourseCard from "../../../components/dashboard/course/courseCard";
import ViewCourse from "../../../components/dashboard/course/view";

import { getCourses } from "@/lib/api";
import { AddCouse } from "@/components/dashboard/forms";
import { AddDialog } from "@/components/collection/modal";
import { Button } from "@/components/ui/button";
import MyDrawer from "@/components/ui/next-drawer";
import { Skeleton } from "@/components/ui/skeleton";

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
          <div className="flex justify-center max-h-[70svh] overflow-y-scroll">
            <AddCouse setCourses={setCourses} setState={setOpen} />
          </div>
        </AddDialog>
      </div>
      {courses.length === 0 ? (
        <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 h-full overflow-y-scroll justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 h-full overflow-y-scroll justify-center">
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
