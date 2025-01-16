import type { IExistingModule } from "@/types/dashboard/forms";
import type { CourseFormData } from "@/dependencies/yup";

import React from "react";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { formatDuration } from "./course/utils";
import ModuleSection from "./course/module";

//Yup
import { courseSchema } from "@/dependencies/yup";
// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// FIXME:Mock existing modules - replace with your API data
const existingModules: IExistingModule[] = [];

const CourseForm: React.FC = () => {
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
      // Transform the data to match API format
      const formattedData = {
        course: {
          title: data.title,
          description: data.description,
        },
        modules: data.modules.map((module) => ({
          title: module.title,
          description: module.description,
          parent_module: module.parent_module,
          lessons: module.lessons.map((lesson) => ({
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

      console.log("Formatted data:", formattedData);
      // Handle API submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Course</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
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

                {moduleFields.map((moduleField, moduleIndex) => (
                  <ModuleSection
                    key={moduleField.id}
                    existingModules={existingModules}
                    form={form}
                    moduleIndex={moduleIndex}
                    removeModule={() => removeModule(moduleIndex)}
                  />
                ))}
              </div>

              <Button className="w-full" type="submit">
                Create Course
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseForm;
