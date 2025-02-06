import type { ILessonSectionProps } from "@/types/dashboard/forms";

import React from "react";
import { Trash2 } from "lucide-react";

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

const LessonSection: React.FC<ILessonSectionProps> = ({
  moduleIndex,
  lessonIndex,
  form,
  removeLesson,
}) => (
  <Card className="p-4">
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h6 className="font-medium">Lesson {lessonIndex + 1}</h6>
        <Button
          size="sm"
          type="button"
          variant="destructive"
          onClick={removeLesson}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <FormField
        control={form.control}
        name={`modules.${moduleIndex}.lessons.${lessonIndex}.title` as const}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lesson Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={
          `modules.${moduleIndex}.lessons.${lessonIndex}.description` as const
        }
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lesson Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.lessons.${lessonIndex}.hours` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours</FormLabel>
              <FormControl>
                <Input
                  max="23"
                  min="0"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={
            `modules.${moduleIndex}.lessons.${lessonIndex}.minutes` as const
          }
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minutes</FormLabel>
              <FormControl>
                <Input
                  max="59"
                  min="0"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={
            `modules.${moduleIndex}.lessons.${lessonIndex}.seconds` as const
          }
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seconds</FormLabel>
              <FormControl>
                <Input
                  max="59"
                  min="0"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  </Card>
);

export default LessonSection;
