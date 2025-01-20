"use client";

import type { UUID } from "crypto";
import type { RootState, StoreDispatch } from "@/redux/store";
import type { CollectionCoursesFormData } from "@/dependencies/yup";
import type { Course, CourseCollection } from "@/types/dashboard/view";

import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collectionSchemaCourses } from "@/dependencies/yup";
// APIs
import { addCourseToCollection, getCourseCollectionDetails } from "@/lib/api";

export const CourseSectioSelection = ({
  availableCourses,
  collection,
  setState,
  setCollection,
}: {
  availableCourses: Course[];
  collection: CourseCollection;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setCollection: (data: CourseCollection) => void;
}) => {
  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<StoreDispatch>();

  const form = useForm<CollectionCoursesFormData>({
    resolver: yupResolver(collectionSchemaCourses),
    defaultValues: {
      courses: [],
    },
  });

  const onSubmit = async (data: CollectionCoursesFormData) => {
    const validData = data.courses?.filter(
      (course): course is UUID => !!course,
    );

    const formData = new FormData();

    formData.append("courses", JSON.stringify(validData));

    await dispatch(addCourseToCollection(collection.id, formData)).then(() => {
      setState(false);
      if (data) {
        dispatch(getCourseCollectionDetails(collection.id)).then((data) => {
          setCollection(data);
        });
      }
    });
  };

  const remainingCourses = availableCourses.filter(
    (course) => !collection?.courses?.some((c) => c.id === course.id),
  );

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                  {remainingCourses.length > 0 ? (
                    <>
                      {remainingCourses
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
                      {remainingCourses.find((c) => c.id === course)?.title}
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
};
