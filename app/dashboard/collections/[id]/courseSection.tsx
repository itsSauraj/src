import type { Course } from "@/types/dashboard/view";
import type { CollectionFormData } from "@/dependencies/yup";
import type { UUID } from "crypto";

import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddDialog } from "@/components/collection/modal";
import { ScrollArea } from "@/components/ui/scroll-area";

const CourseSection = ({
  courses,
  collection,
}: {
  courses: Course[];
  collection: CollectionFormData;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-2">
        <AddDialog
          description="Add a new mentor to your training group"
          setState={setOpen}
          state={open}
          title="Insert Course"
        >
          <div className="flex justify-center">
            <CourseSectioSelection
              availableCourses={courses}
              collection={collection}
            />
          </div>
        </AddDialog>
      </div>
      <ScrollArea className="flex-grow rounded-md p-3 border-2">
        <div className="grid gap-2">
          {(collection.courses ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No courses added to this collection yet.
            </p>
          ) : (
            (collection.courses ?? []).map((course: Course | any) => (
              <div
                key={course.id}
                className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 text-md p-2 rounded-md"
              >
                <p>{course.title}</p>
                <button
                  className="text-sm text-red-500"
                  onClick={() => toast.warning("Not implemented")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default CourseSection;

export const CourseSectioSelection = ({
  availableCourses,
  collection,
}: {
  availableCourses: Course[];
  collection: CollectionFormData;
}) => {
  const handleAddCourse = (courseId: UUID) => {
    toast.warning("Not implemented");
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">Courses</h3>
      <Select onValueChange={handleAddCourse}>
        <SelectTrigger>
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>
        <SelectContent>
          {availableCourses
            .filter(
              (course) =>
                !(collection.courses ?? []).find((c) => c.id === course.id),
            )
            .map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
