import type { Module, Lesson } from "@/types/dashboard/view";

import React from "react";
import { PlayCircle, FolderIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ModuleAccordionProps {
  module: Module;
  level?: number;
  selectable?: boolean;
  isStared?: boolean;
  toggleLesson?: (lessonId: string) => void;
  checkedLessons?: Set<string>;
}

const LessonItem = ({
  lesson,
  isStared,
  selectable,
  toggleLesson,
  checkedLessons,
}: {
  lesson: Lesson;
  isStared?: boolean;
  selectable?: boolean;
  toggleLesson?: (lessonId: string) => void;
  checkedLessons?: Set<string>;
}) => (
  <div
    className="flex items-center gap-3 p-2 hover:bg-accent \
    group cursor-pointer pl-6 border-l-1"
  >
    {!selectable ? (
      <PlayCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
    ) : (
      <Checkbox
        checked={checkedLessons?.has(lesson.id) ?? false}
        className="ml-6"
        disabled={!isStared}
        onCheckedChange={() => toggleLesson && toggleLesson(lesson.id)}
      />
    )}
    <div className="flex-1">
      <p className="text-sm font-medium">{lesson.title}</p>
      <p className="text-xs text-muted-foreground">{lesson.description}</p>
    </div>
    <Badge className="ml-auto" variant="outline">
      {lesson.duration}
    </Badge>
  </div>
);

const ModuleAccordion = ({
  selectable,
  isStared,
  toggleLesson,
  checkedLessons,
  module,
  level = 0,
}: ModuleAccordionProps) => {
  const paddingLeft = level;

  return (
    <Accordion
      className={`w-full ${level > 0 && "border-l-1"}`}
      type="multiple"
    >
      <AccordionItem className="border-none" value={`module-${module.title}`}>
        <AccordionTrigger
          className={`hover:bg-accent/50 rounded-md px-4 py-2 hover:no-underline`}
          style={{ paddingLeft: `${paddingLeft}rem` }}
        >
          <div className="flex items-center gap-3">
            <FolderIcon className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{module.title}</p>
            </div>
            {module.duration && (
              <Badge className="ml-auto" variant="outline">
                {module.duration}
              </Badge>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent className={`pl-${paddingLeft + 4}`}>
          <div className="space-y-1">
            {module.sub_modules.map((subModule, index) => (
              <ModuleAccordion
                key={index}
                checkedLessons={checkedLessons}
                isStared={isStared}
                level={level + 1}
                module={subModule}
                selectable={selectable}
                toggleLesson={toggleLesson}
              />
            ))}

            {module.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                checkedLessons={checkedLessons}
                isStared={isStared}
                lesson={lesson}
                selectable={selectable}
                toggleLesson={toggleLesson}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const ModuleList = ({
  selectable,
  isStared,
  toggleLesson,
  checkedLessons,
  modules,
}: {
  selectable?: boolean;
  isStared?: boolean;
  toggleLesson?: (lessonId: string) => void;
  checkedLessons?: Set<string>;
  modules?: Module[];
}) => {
  return (
    <div className={`space-y-2 ${selectable ? "px-2 border-1" : ""}`}>
      {modules?.map((module, index) => (
        <ModuleAccordion
          key={index}
          checkedLessons={checkedLessons}
          isStared={isStared}
          module={module}
          selectable={selectable}
          toggleLesson={toggleLesson}
        />
      ))}
    </div>
  );
};

export default ModuleList;
