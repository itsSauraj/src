/* eslint-disable @next/next/no-img-element */
"use client";

import type { CollectionFormData } from "@/dependencies/yup";
import type { Course } from "@/types";

import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Pencil, Loader2 } from "lucide-react";
import { MdDelete } from "react-icons/md";

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

function CollectionView({
  collection,
  availableCourses,
}: {
  collection: CollectionFormData;
  availableCourses: Course[];
  onUpdate: (data: any) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const form = useForm({
    defaultValues: {
      title: collection.title,
      description: collection.description,
    },
  });

  const handleUpdate = async (data: any) => {
    setIsLoading(true);

    toast.info("Comming soon");

    setIsLoading(false);
  };

  const handleDelete = async () => {
    toast.info("Comming soon");
  };

  const handleAddCourse = async (courseId: string) => {
    const courseToAdd = availableCourses.find((c) => c.id === courseId)!;

    toast.info("Comming soon");
  };

  const handleRemoveCourse = async (courseId: string) => {
    const courseToRemove = collection.courses?.find((c) => c.id === courseId);

    if (!courseToRemove) {
      toast.error("Course not found");

      return;
    }

    toast.info("Comming soon");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card className="w-full h-[80svh] flex flex-col">
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
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    onClick={() => setIsEditing(false)}
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
        <CardContent className="p-4 h-full">
          <CourseSection collection={collection} courses={availableCourses} />
        </CardContent>
      </Card>
    </div>
  );
}

export { CollectionView };
