import type { CourseData } from "@/types/dashboard/view";

import React from "react";

import { formatDuration } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const CourseLayout = ({ course }: { course: CourseData }) => {
  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{course.metadata.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{course.metadata.description}</p>
          <p>
            <strong>Duration:</strong>{" "}
            {formatDuration(course.metadata.duration)}
          </p>
        </CardContent>
      </Card>

      <Accordion collapsible type="single">
        {course.modules.map((module, moduleIndex: number) => (
          <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`}>
            <AccordionTrigger>
              {module.metadata.sequence}. {module.metadata.title}
            </AccordionTrigger>
            <AccordionContent>
              <p>{module.metadata.description}</p>
              <p>
                <strong>Duration:</strong>{" "}
                {formatDuration(module.metadata.duration)}
              </p>

              {module.sub_modules.length > 0 && (
                <Accordion collapsible className="mt-4" type="single">
                  {module.sub_modules.map((subModule, subModuleIndex) => (
                    <AccordionItem
                      key={subModuleIndex}
                      value={`submodule-${subModuleIndex}`}
                    >
                      <AccordionTrigger>
                        {subModule.metadata.sequence}.{" "}
                        {subModule.metadata.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>{subModule.metadata.description}</p>
                        <p>
                          <strong>Duration:</strong>{" "}
                          {formatDuration(subModule.metadata.duration)}
                        </p>

                        {subModule.lessons.length > 0 && (
                          <div className="mt-4">
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
                <div className="mt-4">
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
    </div>
  );
};

const LessonCard = ({
  lesson,
  index,
}: {
  lesson: CourseData["modules"][0]["lessons"][0];
  index: number;
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>
        {index + 1}. {lesson.title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>{lesson.description}</p>
      <p>
        <strong>Duration:</strong> {lesson.duration}
      </p>
    </CardContent>
  </Card>
);
