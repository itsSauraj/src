"use client";

import type { UUID } from "crypto";
import type { CourseData, Module } from "@/types/dashboard/view";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { formatDuration } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
//API
import { getCourseDetails } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";

const CourseView = ({ course_id }: { course_id: UUID }) => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const dispatch = useDispatch<StoreDispatch>();

  const user_group = useSelector(
    (state: RootState) => state.user?.user?.groups[0] || "",
  );

  useEffect(() => {
    dispatch(getCourseDetails(course_id, user_group)).then((data) => {
      setCourseData(data);
    });
  }, []);

  const [checkedLessons, setCheckedLessons] = useState<Set<string>>(new Set());

  if (!courseData || courseData === null) {
    return null;
  }

  const calculateModuleProgress = (module: Module): number => {
    let totalLessons = 0;
    let completedLessons = 0;

    // Count lessons in current module
    module.lessons.forEach((lesson) => {
      totalLessons++;
      const lessonId = `${module.metadata.id}-${module.metadata.sequence}-${lesson.sequence}`;

      if (checkedLessons.has(lessonId)) {
        completedLessons++;
      }
    });

    // Count lessons in sub-modules
    module.sub_modules.forEach((subModule) => {
      module.lessons.forEach((lesson) => {
        totalLessons++;
        const lessonId = `${subModule.metadata.id}-${subModule.metadata.sequence}-${lesson.sequence}`;

        if (checkedLessons.has(lessonId)) {
          completedLessons++;
        }
      });
    });

    return totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
  };

  const toggleLesson = (lessonId: string) => {
    const newChecked = new Set(checkedLessons);

    if (newChecked.has(lessonId)) {
      newChecked.delete(lessonId);
    } else {
      newChecked.add(lessonId);
    }
    setCheckedLessons(newChecked);
  };

  const renderModule = (module: Module, depth = 0) => {
    const moduleId = `${module.metadata.id}-${module.metadata.sequence}`;
    const progress = calculateModuleProgress(module);

    return (
      <AccordionItem
        key={moduleId}
        className={depth > 0 ? "ml-6" : ""}
        value={moduleId}
      >
        <AccordionTrigger
          className="relative py-3 hover:bg-neutral-100 dark:hover:bg-neutral-100/10 
          flex flex-row-reverse gap-3 p-3 border-x-[1px]"
        >
          <div
            className="absolute left-0 h-full pointer-events-none 
            bg-green-500/40 z-10 transition-all duration-300 ease-in-out"
            style={{
              width: `${progress}%`,
            }}
          />
          <div className="flex-1 flex justify-between">
            <span className="font-medium z-20">{module.metadata.title}</span>
            <span className="z-20">
              {formatDuration(module.metadata.duration)}
            </span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="border-x-[1px]">
          {module.sub_modules.map((subModule) =>
            renderModule(subModule, depth + 1),
          )}
          {module.lessons.map((lesson) => {
            const lessonId = `${moduleId}-${lesson.sequence}`;

            return (
              <div
                key={lessonId}
                className="flex justify-between p-4 hover:bg-neutral-100 dark:hover:bg-neutral-100/10 items-center ml-6 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={checkedLessons.has(lessonId)}
                    className="ml-6"
                    disabled={checkedLessons.has(lessonId)}
                    onCheckedChange={() => toggleLesson(lessonId)}
                  />
                  <span
                    className={
                      checkedLessons.has(lessonId) ? "line-through" : ""
                    }
                  >
                    {lesson.title}
                  </span>
                </div>
                <span className="text-gray-600">{lesson.duration}</span>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <Card className="w-full">
      <ScrollArea className="h-[90vh]">
        <CardHeader>
          <CardTitle className="flex gap-3 flex-wrap">
            {Object.entries(courseData.metadata).map(([key, value]) => {
              if (key === "id") {
                return null;
              }

              if (key === "duration") {
                value = formatDuration(value as string);
              }

              return (
                <InfoCards key={key} title={key}>
                  {value}
                </InfoCards>
              );
            })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div className="bg-neutral-300 dark:bg-neutral-700 font-semibold rounded-t-lg flex justify-between p-4  ">
              <span>Title</span>
              <span>Duration</span>
            </div>
            <Accordion collapsible type="single">
              {courseData.modules.map((module) => renderModule(module))}
            </Accordion>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default CourseView;

const InfoCards = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const getColor = (title: string) => {
    switch (title.toLowerCase()) {
      case "title":
        return "border-blue-500";
      case "duration":
        return "border-green-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <Card
      className={`flex-1 flex flex-col items-center justify-center min-w-[250px]`}
    >
      <CardHeader
        className={`border-t-4 rounded-lg w-full flex text-center p-3 ${getColor(title)}`}
      >
        <CardTitle className="capitalize p-0 font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[80px] flex justify-center items-center font-light">
        {children}
      </CardContent>
    </Card>
  );
};
