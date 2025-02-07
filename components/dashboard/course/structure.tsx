import type { CourseData } from "@/types/dashboard/view";

import React from "react";
import { FaClock } from "react-icons/fa";

import { formatDuration } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import RenderLessons from "@/components/collection/renderImported";

export const CourseLayout = ({ course }: { course: CourseData }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold capitalize">{course.title}</h3>
        <p className="flex items-center gap-2">
          <FaClock />
          {formatDuration(course.duration)}
        </p>
      </div>
      <p>{course.description}</p>
      <div className="my-4">
        <h3 className="font-bold text-xl">Lessons</h3>
        <Separator />
      </div>
      <RenderLessons modules={course.modules} />
    </div>
  );
};
