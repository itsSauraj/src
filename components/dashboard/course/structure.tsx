import type { CourseData, Module } from "@/types/dashboard/view";

import React from "react";
import { FaClock } from "react-icons/fa";

import { formatDuration } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export const CourseLayout = ({ course }: { course: CourseData }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold capitalize">
          {course.metadata.title}
        </h3>
        <p className="flex items-center gap-2">
          <FaClock />
          {formatDuration(course.metadata.duration)}
        </p>
      </div>
      <p>{course.metadata.description}</p>
      <div className="my-4">
        <h3 className="font-bold text-xl">Lessons</h3>
        <Separator />
      </div>
      <RenderLessons modules={course.modules} />
    </div>
  );
};

export const RenderLessons = ({ modules }: { modules: Module[] }) => (
  <Accordion collapsible type="single">
    {modules.map((module, moduleIndex: number) => (
      <AccordionItem
        key={moduleIndex}
        className="border-1 px-4"
        value={`module-${moduleIndex}`}
      >
        <AccordionTrigger>
          <div className="w-full flex justify-between items-center px-2">
            {module.metadata.sequence}. {module.metadata.title}
            <p className="flex items-center gap-2">
              <FaClock /> {formatDuration(module.metadata.duration)}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p>{module.metadata.description}</p>
          {module.sub_modules.length > 0 && (
            <Accordion collapsible className="mt-4" type="single">
              {module.sub_modules.map((subModule, subModuleIndex) => (
                <AccordionItem
                  key={subModuleIndex}
                  className="border-l-1"
                  value={`submodule-${subModuleIndex}`}
                >
                  <AccordionTrigger>
                    <div className="w-full flex justify-between items-center px-2">
                      {subModule.metadata.title}
                      <p className="flex items-center gap-2">
                        <FaClock /> {formatDuration(module.metadata.duration)}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {subModule.lessons.length > 0 && (
                      <div className="mt-4 flex flex-col gap-2 px-3">
                        {subModule.lessons.map((lesson, lessonIndex) => (
                          <LessonCard
                            key={lessonIndex}
                            index={lessonIndex}
                            lesson={lesson}
                          />
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {module.lessons.length > 0 && (
            <div className="mt-4 flex flex-col gap-2 px-3">
              {module.lessons.map((lesson, lessonIndex) => (
                <LessonCard
                  key={lessonIndex}
                  index={lessonIndex}
                  lesson={lesson}
                />
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

const LessonCard = ({
  lesson,
  index,
}: {
  lesson: CourseData["modules"][0]["lessons"][0];
  index: number;
}) => (
  <div className="flex justify-between items-center">
    {index + 1}. {lesson.title}
    <p>{lesson.description}</p>
    <p className="flex items-center gap-2">{lesson.duration}</p>
  </div>
);
