import type { Course, CourseCollection } from "@/types/dashboard/view";
import type { UUID } from "crypto";

import React from "react";
import { useState } from "react";
import { X } from "lucide-react";

import { CourseSectioSelection } from "@/components/dashboard/forms";
import { CreateToolTipT } from "@/components/collection/tooltip";
// UI
import { ModalDialog } from "@/components/collection/modal";
import { ScrollArea } from "@/components/ui/scroll-area";

const CourseSection = ({
  courses,
  collection,
  handleRemoveCourse,
  setCollection,
  handleOnOpenChange,
}: {
  courses: Course[];
  collection: CourseCollection;
  handleRemoveCourse: (courseId: UUID) => void;
  setCollection: (data: CourseCollection) => void;
  handleOnOpenChange: (id: UUID) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-2 h-max">
        <ModalDialog
          description="Add a new mentor to your training group"
          setState={setOpen}
          state={open}
          title="Insert Course"
        >
          <div className="flex justify-center">
            <CourseSectioSelection
              availableCourses={courses}
              collection={collection}
              setCollection={setCollection}
              setState={setOpen}
            />
          </div>
        </ModalDialog>
      </div>
      <ScrollArea className="max-h-[450px] rounded-md p-3 border-2">
        <div className="grid gap-2">
          {(collection.courses ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No courses added to this collection yet.
            </p>
          ) : (
            (collection.courses ?? []).map((course: Course | any) => (
              <button
                key={course.id}
                className="flex items-center justify-between hover:bg-neutral-200 dark:hover:bg-neutral-700
                bg-neutral-100 dark:bg-neutral-800 text-md p-2 rounded-md cursor-pointer"
                onClick={() => handleOnOpenChange(course.id)}
              >
                <p>{course.title}</p>
                <CreateToolTipT
                  content="Remove course"
                  trigger={
                    <button
                      className="text-sm text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCourse(course.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  }
                />
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default CourseSection;
