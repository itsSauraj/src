/* eslint-disable @next/next/no-img-element */
"use client";

import type { CollectionFormData } from "@/dependencies/yup";
import type { Course, CourseCollection } from "@/types/dashboard/view";
import type { StoreDispatch } from "@/redux/store";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Pencil, Loader2, Upload, X } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import CourseSection from "./courseSection";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MyAlertDialog } from "@/components/collection/alert-dialog";
//APIS
import {
  updateCollection,
  removeCourseFromCollection,
  deleteCollection,
} from "@/lib/api";

function CollectionView({
  collection,
  availableCourses,
  setCollection,
}: {
  availableCourses: Course[];
  collection: CourseCollection;
  setCollection: (data: CourseCollection) => void;
}) {
  const dispatch = useDispatch<StoreDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") + collection.image,
  );

  const form = useForm({
    defaultValues: {
      title: collection.title,
      description: collection.description,
      image: collection.image,
    },
  });

  useEffect(() => {
    form.reset({
      title: collection.title,
      description: collection.description,
      image: collection.image,
    });
  }, [collection]);

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

  const handleUpdate = async (data: CollectionFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description?.toString() || "");
    if (data.image) {
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
    }

    const response = await dispatch(updateCollection(collection.id, formData));

    if (response) {
      setIsEditing(false);
      setIsLoading(false);
      setCollection(response);
    }
  };

  const router = useRouter();
  const handleDelete = async () => {
    dispatch(deleteCollection(collection.id)).then(() => {
      router.push("/dashboard/collections");
    });
  };

  const handleRemoveCourse = async (courseId: string) => {
    const courseToRemove = collection.courses?.find(
      (c: Course) => c.id === courseId,
    );

    if (courseToRemove) {
      await dispatch(
        removeCourseFromCollection(collection.id, courseToRemove.id),
      ).then((data) => {
        if (data) {
          setCollection({
            ...collection,
            courses: collection.courses.filter(
              (c: Course) => c.id !== courseToRemove.id,
            ),
          });
        }
      });
    }
  };

  return (
    <div className="py-6 space-y-6 h-full">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 relative">
          {collection.image && (
            <div className="w-full h-full overflow-hidden rounded-lg absolute top-0 left-0 opacity-20 pointer-events-none">
              <img
                alt={collection.title}
                className="w-full h-full object-cover"
                src={
                  (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
                  collection.image
                }
              />
            </div>
          )}
          {isEditing ? (
            <Form {...form}>
              <form
                className="space-y-4 w-full"
                onSubmit={form.handleSubmit(handleUpdate)}
              >
                <div className="flex gap-4 justify-between items-center">
                  <div className="flex flex-col gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
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
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="resize-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                                <div className="relative max-h-[120px]">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    alt="Preview"
                                    className="rounded h-[120px] w-[300px] object-cover"
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
                                    Drag & drop an image here, or click to
                                    select
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
                </div>
                <div className="flex gap-2">
                  <Button disabled={isLoading} type="submit">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <Button
                    disabled={isLoading}
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="flex justify-between gap-2 z-10 w-full">
              <div className="space-y-2">
                <CardTitle className="text-3xl">{collection.title}</CardTitle>
                <CardDescription>
                  <p className="max-h-[4em] overflow-hidden w-full">
                    {collection.description}
                  </p>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => setOpenAlert(true)}
                >
                  <MdDelete className="h-4 w-4" />
                </Button>
                <MyAlertDialog
                  description="Are you sure you want to delete this Collection?"
                  setOpen={setOpenAlert}
                  title="Delete Collection"
                  onContinue={handleDelete}
                  onOpen={openAlert}
                />
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 h-full flex flex-col gap-4 overflow-y-scroll no-scrollbar">
          <CourseSection
            collection={collection}
            courses={availableCourses}
            handleRemoveCourse={handleRemoveCourse}
            setCollection={setCollection}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { CollectionView };
