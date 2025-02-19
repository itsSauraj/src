"use client";

import type { UUID } from "crypto";
import type { UpdateCollectionFormData } from "@/dependencies/yup";
import type { Course, CourseCollection } from "@/types/dashboard/view";
import type { StoreDispatch } from "@/redux/store";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Pencil, Loader2, Upload, X } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import Image from "next/image";

import CourseSection from "./courseSection";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { CreateToolTipT } from "@/components/collection/tooltip";
import { cn } from "@/lib/utils";
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
  handleOnOpenChange,
}: {
  availableCourses: Course[];
  collection: CourseCollection;
  setCollection: (data: CourseCollection) => void;
  handleOnOpenChange: (id: UUID) => void;
}) {
  const dispatch = useDispatch<StoreDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    collection.image
      ? (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") + collection.image
      : null,
  );

  const form = useForm({
    defaultValues: {
      title: collection.title,
      description: collection.description,
      alloted_time: collection.alloted_time,
      image: collection.image,
      removed: false,
    },
  });

  useEffect(() => {
    form.reset({
      title: collection.title,
      description: collection.description,
      alloted_time: collection.alloted_time,
      image: collection.image,
      removed: false,
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
    form.setValue("removed", true);
    setPreview(null);
  };

  const handleUpdate = (data: UpdateCollectionFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description?.toString() || "");
    formData.append("alloted_time", data.alloted_time?.toString() || "");
    formData.append("removed", data.removed?.toString());
    if (data.image) {
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
    }

    dispatch(updateCollection(collection.id, formData)).then((data) => {
      setIsEditing(false);
      setIsLoading(false);
      if (data) {
        setCollection(data);
      }
    });
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
    <div className="space-y-6 h-full">
      <Card className="w-full h-full flex flex-col">
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between space-y-0 relative bg-accent \
            rounded-xl h-max",
            isEditing && "border-b-1",
          )}
        >
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {collection.image && !isEditing ? (
              <Image
                fill
                alt={collection.title}
                className="pointer-events-none z-10 w-full object-cover h-full rounded-xl opacity-70"
                src={
                  (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
                  collection.image
                }
              />
            ) : (
              <div className="w-full h-full flex gap-5 flex-wrap text-primary/40 relative z-10 overflow-hidden">
                {Array.from({ length: 100 }).map((_, index) => (
                  <span
                    key={index}
                    className="selection:not-sr-only
                          -rotate-[30deg] text-sm opacity-20
                        "
                  >
                    {collection.title.split(" ")[0]}
                  </span>
                ))}
              </div>
            )}
          </div>
          {isEditing ? (
            <Form {...form}>
              <form
                className="space-y-1 w-full flex flex-col justify-center gap-2"
                onSubmit={form.handleSubmit(handleUpdate as any)}
              >
                <div className="flex gap-2 justify-between items-center">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-4 flex-grow">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input className="border-primary/40" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="alloted_time"
                        render={({ field }) => (
                          <FormItem className="max-w-[150px]">
                            <FormLabel>Alloted time (in days)</FormLabel>
                            <FormControl>
                              <Input className="border-primary/40" {...field} />
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
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="border-primary/40 resize-none"
                              {...field}
                            />
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
                              className={`border-2 border-dashed rounded-lg p-1 text-center cursor-pointer
                                    ${isDragActive ? "border-primary bg-primary/10" : "border-border"}`}
                            >
                              <input {...getInputProps()} />
                              {preview ? (
                                <div className="relative max-h-[120px]">
                                  <Image
                                    alt="Preview"
                                    className="rounded h-[120px] w-[300px] object-cover"
                                    height={120}
                                    src={preview}
                                    width={300}
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
                  <CreateToolTipT
                    content="Save changes"
                    trigger={
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
                    }
                  />
                  <CreateToolTipT
                    content="Cancel editing"
                    trigger={
                      <Button
                        disabled={isLoading}
                        type="button"
                        variant="outline"
                        onClick={() => {
                          form.reset();
                          setPreview(
                            (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
                              collection.image,
                          );
                          setIsEditing(false);
                        }}
                      >
                        Cancel
                      </Button>
                    }
                  />
                </div>
              </form>
            </Form>
          ) : (
            <div className="flex gap-2 w-full z-30 justify-end">
              <CreateToolTipT
                content="Edit Collection"
                trigger={
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-4" />
                  </Button>
                }
              />
              <CreateToolTipT
                content="Delete Collection"
                trigger={
                  <Button
                    disabled={collection.is_default}
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      collection.is_default ? null : setOpenAlert(true);
                    }}
                  >
                    <MdDelete className="h-4 w-4" />
                  </Button>
                }
              />
              <MyAlertDialog
                description="Are you sure you want to delete this Collection?"
                setOpen={setOpenAlert}
                title="Delete Collection"
                onContinue={handleDelete}
                onOpen={openAlert}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 h-full flex flex-col gap-4 overflow-y-scroll no-scrollbar">
          <CourseSection
            collection={collection}
            courses={availableCourses}
            handleOnOpenChange={handleOnOpenChange}
            handleRemoveCourse={handleRemoveCourse}
            isEditing={isEditing}
            setCollection={setCollection}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { CollectionView };
