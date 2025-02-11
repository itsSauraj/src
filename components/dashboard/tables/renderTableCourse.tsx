/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { UUID } from "crypto";
import type {
  CourseData,
  Module,
  TraineeCourseView,
} from "@/types/dashboard/view";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { formatDuration } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ModuleList from "@/components/collection/renderImported";
//API
import {
  getCourseDetails,
  setStartCourse,
  markLessonAsComplete,
  unmarkLessonAsComplete,
} from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateToolTipT } from "@/components/collection/tooltip";

const CourseView = ({ collection_id }: { collection_id: UUID }) => {
  const searchParams = useSearchParams();
  const course_id = searchParams.get("course") as UUID;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [checkedLessons, setCheckedLessons] = useState<Set<string>>(new Set());
  const [isStared, setIsStared] = useState(false);
  const dispatch = useDispatch<StoreDispatch>();

  const user_group = useSelector(
    (state: RootState) => state.user?.user?.groups[0] || "",
  );

  useEffect(() => {
    dispatch(getCourseDetails(course_id, collection_id, user_group)).then(
      (data: TraineeCourseView) => {
        setCourseData(data.course);
        setIsStared(data.isStarted);
        setCheckedLessons(new Set(data.completed_lessons));
      },
    );
  }, []);

  if (!courseData || courseData === null) {
    return null;
  }

  const handleStartCourse = () => {
    dispatch(setStartCourse(collection_id, course_id)).then((data) => {
      setIsStared(data);
    });
  };

  const calculateModuleProgress = (module: Module): number => {
    let totalLessons = 0;
    let completedLessons = 0;

    module.lessons.forEach((lesson) => {
      totalLessons++;
      if (checkedLessons.has(lesson.id)) {
        completedLessons++;
      }
    });

    // Count lessons in sub-modules
    module.sub_modules.forEach((subModule) => {
      module.lessons.forEach((lesson) => {
        totalLessons++;
        const lessonId = `${subModule.id}-${subModule.sequence}-${lesson.sequence}`;

        if (checkedLessons.has(lessonId)) {
          completedLessons++;
        }
      });
    });

    return totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
  };

  const toggleLesson = (lessonId: string) => {
    const newChecked = new Set(checkedLessons);

    const data = {
      collection_id: collection_id as UUID,
      course_id: course_id as UUID,
      lesson_id: lessonId as UUID,
    };

    if (newChecked.has(lessonId)) {
      dispatch(unmarkLessonAsComplete(data));
      newChecked.delete(lessonId);
    } else {
      dispatch(markLessonAsComplete(data));
      newChecked.add(lessonId);
    }
    setCheckedLessons(newChecked);
  };

  const renderModule = (module: Module, depth = 0) => {
    const moduleId = `${module.id}-${module.sequence}`;
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
            <span className="font-medium z-20">{module.title}</span>
            <span className="z-20">{formatDuration(module.duration)}</span>
          </div>
        </AccordionTrigger>

        <AccordionContent className="border-x-[1px]">
          {module.sub_modules.map((subModule) =>
            renderModule(subModule, depth + 1),
          )}
          {module.lessons.map((lesson) => {
            const lessonId = lesson.id;

            return (
              <div
                key={lessonId}
                className="flex justify-between p-4 hover:bg-neutral-100 dark:hover:bg-neutral-100/10 
                items-center ml-6 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={checkedLessons.has(lessonId)}
                    className="ml-6"
                    disabled={!isStared}
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
    <ScrollArea className="h-[90vh]">
      <CardHeader>
        <CardTitle>
          <div
            className={`relative h-[200px] w-full ${courseData.image ? "bg-neutral-300 dark:bg-neutral-700/30" : "bg-primary"} rounded-t-lg`}
          >
            {courseData.image && (
              <Image
                alt={courseData.title}
                className="w-24 h-24 rounded-lg absolute top-0 left-0 pointer-events-none z-1"
                fill={true}
                objectFit="cover"
                src={
                  (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
                  courseData.image
                }
              />
            )}
            <div
              className="flex flex-col z-10 bg-white absolute left-0 opacity-90 \
              top-[50%] -translate-y-[50%] border-l-1 w-[95%] md:w-[75%] lg:w-[40%] h-max p-4 rounded-r-sm"
            >
              <span className="flex gap-2">
                <h3 className="text-md font-bold items-center">Title: </h3>
                <p className="text-md font-light">{courseData.title}</p>
              </span>
              <span className="flex gap-2">
                <h3 className="text-md font-bold items-center">Duration: </h3>
                <p className="text-md font-light">
                  {formatDuration(courseData.duration)}
                </p>
              </span>
              <span className="flex gap-2">
                <h3 className="text-md font-bold items-center">
                  Description:{" "}
                </h3>
                <p className="text-md font-light line-clamp-4 md:line-clamp-6 lg:line-clamp-8">
                  {courseData.description}
                </p>
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full justify-between items-center mb-3">
          <h3 className="text-2xl font-bold capitalize">Course Lessons</h3>
          <CreateToolTipT
            content={isStared ? "Started" : "Start Course"}
            trigger={
              <Button disabled={isStared} onClick={handleStartCourse}>
                {isStared ? "Started" : "Start Course"}
              </Button>
            }
          />
        </div>
        <div className="w-full">
          <div className="bg-neutral-300 dark:bg-neutral-700 font-semibold rounded-t-lg flex justify-between p-4  ">
            <span>Title</span>
            <span>Duration</span>
          </div>
          <ModuleList
            selectable
            checkedLessons={checkedLessons}
            isStared={isStared}
            modules={courseData.modules}
            toggleLesson={toggleLesson}
          />
        </div>
      </CardContent>
    </ScrollArea>
  );
};

export default CourseView;
