"use client";

import type { CourseFormData } from "@/dependencies/yup";
import type { StoreDispatch } from "@/redux/store";
import type { SetStateAction } from "react";
import type { Course } from "@/types/dashboard/view";

import React from "react";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import { formatDuration } from "./course/utils";
import ModuleSection from "./course/module";

//API
import { createNewCourse } from "@/lib/api";
//Yup
import { courseSchema } from "@/dependencies/yup";
// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CourseFormProps {
  setCourses: React.Dispatch<SetStateAction<Course[]>>;
  setState: (value: boolean) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ setCourses, setState }) => {
  const dispatch = useDispatch<StoreDispatch>();

  const form = useForm<CourseFormData>({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      modules: [
        {
          title: "",
          description: "",
          parent_module: null,
          lessons: [
            {
              title: "",
              description: "",
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
        },
      ],
    },
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  const onSubmit = async (data: CourseFormData): Promise<void> => {
    try {
      const formattedData = {
        course: {
          title: data.title,
          description: data.description,
        },
        modules: (data.modules ?? []).map((module) => ({
          title: module.title,
          description: module.description,
          parent_module: module.parent_module,
          lessons: (module.lessons ?? []).map((lesson) => ({
            title: lesson.title,
            description: lesson.description,
            duration: formatDuration(
              lesson.hours,
              lesson.minutes,
              lesson.seconds,
            ),
          })),
        })),
      };

      const created_course = await dispatch(
        createNewCourse(formattedData as unknown as CourseFormData),
      );

      setCourses((courses) => [created_course, ...courses]);
      setState(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full max-w-[90%] mx-auto p-0 md:p-4 lg:p-6 h-[100%]">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Course Details */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Modules Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Modules</h3>
            </div>
            {moduleFields.map((moduleField, moduleIndex) => (
              <ModuleSection
                key={moduleField.id}
                form={form as any}
                moduleIndex={moduleIndex}
                removeModule={() => removeModule(moduleIndex)}
              />
            ))}
            <div className="flex justify-end items-center">
              <Button
                size="sm"
                type="button"
                onClick={() =>
                  appendModule({
                    title: "",
                    description: "",
                    parent_module: null,
                    lessons: [
                      {
                        title: "",
                        description: "",
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                      },
                    ],
                  })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>
          </div>

          <Button className="w-full" type="submit">
            Create Course
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CourseForm;
