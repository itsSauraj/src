import type { IModuleSectionProps } from "@/types/dashboard/forms";

import React from "react";
import { Trash2, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

import ModuleCombobox from "./ModuleCombo";
import LessonSection from "./lesson";

// Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ModuleSection: React.FC<IModuleSectionProps> = ({
  moduleIndex,
  form,
  removeModule,
}) => {
  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control: form.control,
    name: `modules.${moduleIndex}.lessons` as const,
  });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Module {moduleIndex + 1}</h4>
          <Button
            size="sm"
            type="button"
            variant="destructive"
            onClick={removeModule}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <ModuleCombobox form={form} moduleIndex={moduleIndex} /> */}

        {/* Lessons Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="font-medium">Lessons</h5>
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() =>
                appendLesson({
                  title: "",
                  description: "",
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Lesson
            </Button>
          </div>

          {lessonFields.map((lessonField, lessonIndex) => (
            <LessonSection
              key={lessonField.id}
              form={form}
              lessonIndex={lessonIndex}
              moduleIndex={moduleIndex}
              removeLesson={() => removeLesson(lessonIndex)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ModuleSection;
