"use client";

import type { SetStateAction } from "react";
import type { CourseFormData } from "@/dependencies/yup";
import type { ImportCreateCourse } from "@/types/dashboard/course";
import type { StoreDispatch } from "@/redux/store";
import type { Course } from "@/types/dashboard/view";

import Image from "next/image";
import React, { useState, useCallback } from "react";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

import { createNewCourse } from "@/lib/api";
import ModuleList from "@/components/collection/renderImported";
import { ImportCourseSchema, ImportFormData } from "@/dependencies/yup";
import { ScrollArea } from "@/components/ui/scroll-area";
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

interface ScannedStructureProps {
  data: ImportCreateCourse;
  setCourses: React.Dispatch<SetStateAction<Course[]>>;
  setState: (value: boolean) => void;
  onClose?: () => void;
}

const ScannedStructure: React.FC<ScannedStructureProps> = ({
  data,
  setCourses,
  setState,
  onClose,
}) => {
  const dispatch = useDispatch<StoreDispatch>();
  const [imagePreview, setImagePreview] = useState<string>(
    data.course.image || "",
  );

  const form = useForm<ImportFormData>({
    resolver: yupResolver(ImportCourseSchema),
    defaultValues: {
      title: data.course.title,
      description: data.course.description,
      image: data.course.image,
    },
  });

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        form.setValue("image", file);
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [form],
  );

  const onSubmit = async (formData: ImportFormData) => {
    try {
      const formDataObj = new FormData();

      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);

      if (formData.image) {
        formDataObj.append("image", formData.image as Blob);
      }

      formDataObj.append("modules", JSON.stringify(data.modules));

      const created_course = await dispatch(
        createNewCourse(formDataObj as unknown as CourseFormData),
      );

      setCourses((courses) => [created_course, ...courses]);
      setState(false);
      onClose?.();
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6 p-2" onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-[70vh] px-2">
          <div className="flex gap-2 items-center px-2 hover:bg-gray-100 py-3 rounded-md">
            <FormField
              control={form.control}
              name="image"
              render={(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                { field: { value, onChange, ...field } },
              ) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-4">
                      <label
                        className="flex items-center justify-center w-[90px] h-[80px] border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                        htmlFor="image-upload"
                      >
                        {imagePreview ? (
                          <Image
                            alt="Course preview"
                            className="w-full h-full object-cover rounded-lg"
                            height={60}
                            src={imagePreview}
                            width={60}
                          />
                        ) : (
                          <div className="flex flex-col items-center text-muted-foreground">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-[10px] mt-2">
                              Cover Image
                            </span>
                          </div>
                        )}
                      </label>
                      <Input
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        type="file"
                        onChange={handleImageUpload}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="p-2 hover:bg-gray-100 py-3 rounded-md -mt-2">
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-20 resize-none"
                    placeholder="Course Description*"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h4 className="font-bold py-2">Imported Lessons</h4>
            <ModuleList modules={data.modules} />
          </div>
        </ScrollArea>
        <div className="flex justify-end">
          <Button type="submit">Save Course</Button>
        </div>
      </form>
    </Form>
  );
};

export default ScannedStructure;
