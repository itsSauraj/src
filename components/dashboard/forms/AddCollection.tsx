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
import { Badge } from "@/components/ui/badge";

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
      alloted_time: 0,
      image: undefined,
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
      if (data.alloted_time) {
        formData.append("alloted_time", data.alloted_time.toString());
      }
      if (data.image) formData.append("image", data.image);
      if (data.courses?.length) {
        formData.append("courses", JSON.stringify(data.courses));
      }

      toast.promise(dispatch(createNewCollection(formData)), {
        loading: "Creating collection...",
        success: (data) => {
          setCollections((collections) => [...collections, data]);
          form.reset();
          setPreview(null);
          setState(false);
          dispatch(setAuthLoading(false));

          return "Collection created successfully";
        },
        error: (_error) => {
          dispatch(setAuthLoading(false));

          return "Failed to create collection";
        },
      });
    } catch {
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
          name="alloted_time"
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
                <SelectContent className="max-h-60">
                  {courses.length > 0 ? (
                    <>
                      {courses
                        .filter((course) => !field.value?.includes(course.id))
                        .map((course) => (
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
                <div className="flex flex-wrap gap-2 mt-2 p-1 border-[1px] rounded-md">
                  {(field.value ?? []).map((course) => (
                    <Badge
                      key={course}
                      className="flex items-cnter gap-1 justify-between p-0 py-[5px] px-[4px]"
                    >
                      {courses.find((c) => c.id === course)?.title}
                      <Button
                        className="h-4 w-4 hover:bg-red-500 rounded-full"
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
                    </Badge>
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
