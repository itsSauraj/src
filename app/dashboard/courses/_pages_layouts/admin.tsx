"use client";

import type { StoreDispatch, RootState } from "@/redux/store";
import type { Course } from "@/types/dashboard/view";
import type { UUID } from "crypto";

import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { useRouter } from "next/navigation";

import CourseCard from "@/components/dashboard/course/courseCard";
import ViewCourse from "@/components/dashboard/course/view";
/* APIs */
import { getCourses, deleteCourse } from "@/lib/api";
// compoenets
import { AddCouse } from "@/components/dashboard/forms";
import { ModalDialog } from "@/components/collection/modal";
import MyDrawer from "@/components/collection/mySheetDrawer";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CourseUpload } from "@/components/dashboard/course/courseUploader";
// my collections
import { MyAlertDialog } from "@/components/collection/alert-dialog";

export const CourseDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState<boolean>(false);
  const [importOpen, setImportOpen] = useState<boolean>(false);
  const [openCourseID, setOpenCourseID] = useState<UUID | null>(null);
  const [deleteCourseID, setDeleteCourseID] = useState<UUID | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  const handleBackdropChange = () => {
    onOpen();
  };

  useEffect(() => {
    setIsMounted(true);
    dispatch(getCourses()).then((data) => {
      setCourses(data);
    });
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleDeleteAction = (id: UUID) => {
    setDeleteCourseID(id);
    setOpenAlert(true);
  };

  const handleEditAction = (id: UUID) => {
    router.push(`/dashboard/courses/update/${id}`);
  };

  const onConfirmDelete = () => {
    if (deleteCourseID) {
      dispatch(deleteCourse(deleteCourseID)).then(() => {
        dispatch(getCourses()).then((data) => {
          setCourses(data);
        });
      });
    }
    setOpenAlert(false);
  };

  return (
    <div className="flex flex-col w-full h-[80svh]">
      <div className="flex justify-end gap-3">
        <ModalDialog
          disabled
          className="sm:min-w-[100svw] lg:min-w-[45svw]"
          description="Add a new mentor to your training group"
          setState={setImportOpen}
          state={importOpen}
          title="Import Course"
          type="import"
        >
          <CourseUpload setCourses={setCourses} setState={setImportOpen} />
        </ModalDialog>
        <ModalDialog
          className="sm:min-w-[100svw] lg:min-w-[50svw]"
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
        </ModalDialog>
      </div>
      {!isLoading && courses.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <Empty
            description={
              <span className="text-neutral-500">No Courses found</span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      ) : isLoading && courses.length === 0 ? (
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
            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  className="min-w-full"
                  course={course}
                  handleDeleteAction={handleDeleteAction}
                  handleEditAction={handleEditAction}
                  openCourse={handleBackdropChange}
                  setOpenCourseID={setOpenCourseID}
                />
              ))}
            </div>
          </ScrollArea>
          <MyDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
            <ViewCourse courseId={openCourseID as UUID} />
          </MyDrawer>
        </>
      )}
      <MyAlertDialog
        description="Are you sure you want to delete this Collection?"
        setOpen={setOpenAlert}
        title="Delete Collection"
        onContinue={onConfirmDelete}
        onOpen={openAlert}
      />
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
