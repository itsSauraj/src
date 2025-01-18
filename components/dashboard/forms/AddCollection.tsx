"use client";

import type { CollectionFormData } from "@/dependencies/yup";
import type { SetStateAction } from "react";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { Course } from "@/types/dashboard/view";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

// APIs
import { getCourses, createNewCollection } from "@/lib/api";
//deps
import { setAuthLoading } from "@/redux/slice/app";
import { collectionSchema } from "@/dependencies/yup";
//componetns
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddCollection({
  setCollections,
  setState,
}: {
  setCollections: React.Dispatch<SetStateAction<CollectionFormData[]>>;
  setState: (value: boolean) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const dispatch = useDispatch<StoreDispatch>();
  const app = useSelector((state: RootState) => state.app);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await dispatch(getCourses());

      setCourses(data);
    };

    fetchCourses();
  }, [dispatch]);

  const form = useForm<CollectionFormData>({
    resolver: yupResolver(collectionSchema),
    defaultValues: {
      title: "",
      description: "",
      courses: [],
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        form.setValue("image", file);
        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const removeImage = () => {
    form.setValue("image", undefined);
    setPreview(null);
  };

  const onSubmit = async (data: CollectionFormData) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      if (data.description) formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);
      if (data.courses?.length) {
        data.courses.forEach((course) => {
          if (course) {
            formData.append("courses", course);
          }
        });
      }
      toast.promise(dispatch(createNewCollection(formData)), {
        loading: "Creating collection...",
        success: (data) => {
          setCollections((collections) => [...collections, data]);
          setState(false);

          return "Collection created successfully";
        },
        error: "Failed to create collection",
      });

      form.reset();
      setPreview(null);
    } catch (error: any) {
      dispatch(setAuthLoading(false));
      toast("Error", {
        description: "Failed to create collection",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter collection title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter collection description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="relative">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                          ${isDragActive ? "border-primary bg-primary/10" : "border-border"}`}
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <div className="relative w-full aspect-video">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="Preview"
                          className="rounded object-cover w-full h-full"
                          src={preview}
                        />
                        <Button
                          className="absolute top-2 right-2"
                          size="icon"
                          type="button"
                          variant="destructive"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop an image here, or click to select
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Courses</FormLabel>
              <Select
                value=""
                onValueChange={(value) =>
                  field.onChange([...(field.value || []), value])
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select courses" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.length > 0 ? (
                    <>
                      <SelectItem value="select">Select</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <SelectItem disabled value="none">
                      No Courses Found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {(field.value?.length ?? 0) > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(field.value ?? []).map((course) => (
                    <div
                      key={course}
                      className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                    >
                      {courses.find((c) => c.id === course)?.title}
                      <Button
                        className="h-4 w-4"
                        size="icon"
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          field.onChange(
                            field.value?.filter((c) => c !== course),
                          );
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={app.auth.isLoading} type="submit">
          {app.auth.isLoading && <Loader2 className="animate-spin" />}
          {app.auth.isLoading ? "Creating..." : "Create Collection"}
        </Button>
      </form>
    </Form>
  );
}
