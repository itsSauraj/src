"use client";

import type { UUID } from "crypto";
import type { Exam } from "@/types/dashboard/exam";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { ExamScheduleRequest, IMemberForm } from "@/dependencies/yup";
import type { ResponseMiniFiedTraineeCollectionData } from "@/types/dashboard/report";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { examScheduleSchema } from "@/dependencies/yup";
// APIS
import {
  getMentors,
  getTrainees,
  getMiniFiedTraineeCollectionData,
  scheduleExam,
  updateExam,
} from "@/lib/api";

const ExamSchedulingForm = ({
  type = "schedule",
  defaultValues,
  setSchedule,
  setState,
}: {
  type?: "schedule" | "update" | "update-single";
  defaultValues?: Exam;
  setSchedule: any;
  setState: any;
}) => {
  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);
  const [mentors, setMentors] = React.useState<IMemberForm[]>([]);
  const [trainees, setTrainees] = React.useState<IMemberForm[]>([]);
  const [traineeCollections, setTraineeCollections] =
    React.useState<ResponseMiniFiedTraineeCollectionData | null>(null);
  const [checked, setChecked] = React.useState(false);

  const initialValues = {
    assigned_trainee: (defaultValues?.assigned_trainee.id as UUID) ?? "",
    collection: (defaultValues?.collection.id as UUID) ?? "",
    exam_date: (defaultValues?.exam_date as unknown as Date) ?? "",
    exam_time: (defaultValues?.exam_time as string) ?? "",
    duration: defaultValues?.duration ?? 30,
    assigned_mentor: (defaultValues?.assigned_mentor.id as UUID) ?? "",
    exam_details: (defaultValues?.exam_details as string) ?? "",
  };

  const form = useForm<ExamScheduleRequest>({
    resolver: yupResolver(examScheduleSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  const onSubmit = React.useCallback(
    async (formData: ExamScheduleRequest) => {
      try {
        switch (type) {
          case "schedule":
            await dispatch(scheduleExam(formData)).then((data) => {
              form.reset();
              setSchedule((prev: Exam[]) => [data, ...prev]);
              setState(false);
            });
            break;
          case "update":
            await dispatch(
              updateExam(defaultValues?.id as UUID, formData, checked),
            ).then((data: Exam) => {
              form.reset();
              setSchedule((prev: Exam[]) => {
                const index = prev.findIndex(
                  (item: Exam) => item.id === defaultValues?.id,
                );

                prev[index] = {
                  ...data,
                };

                return prev;
              });
              setState(false);
            });
            break;
          case "update-single":
            await dispatch(
              updateExam(defaultValues?.id as UUID, formData, checked),
            ).then((data: Exam) => {
              form.reset();
              setSchedule(data);
              setState(false);
            });
            break;
        }
      } catch (error) {
      console.error("Failed to schedule exam:", error); // eslint-disable-line
      }
    },
    [form, checked],
  );

  useEffect(() => {
    dispatch(getTrainees()).then((data) => {
      setTrainees(data);
    });
    dispatch(getMentors()).then((data) => {
      setMentors(data);
    });
  }, [dispatch]);

  useEffect(() => {
    {
      form.watch("assigned_trainee") &&
        dispatch(
          getMiniFiedTraineeCollectionData(
            form.getValues().assigned_trainee as UUID,
          ),
        ).then((data) => {
          setTraineeCollections(data as ResponseMiniFiedTraineeCollectionData);
        });
    }
  }, [dispatch, form.watch("assigned_trainee")]);

  const traineeOptions = React.useMemo(() => {
    return trainees.map((trainee) => (
      <SelectItem key={trainee.id} value={trainee.id}>
        {trainee.first_name} {trainee.last_name}
      </SelectItem>
    ));
  }, [trainees]);

  const mentorOptions = React.useMemo(() => {
    return mentors.map((mentor) => (
      <SelectItem key={mentor.id} value={mentor.id}>
        {mentor.first_name} {mentor.last_name}
      </SelectItem>
    ));
  }, [mentors]);

  const collectionOptions = React.useMemo(() => {
    if (traineeCollections) {
      return traineeCollections.assigned_collections.map((collection) => (
        <SelectItem key={collection.id} value={collection.id}>
          {collection.title}
        </SelectItem>
      ));
    }

    return <SelectItem value="no-collection">No collection found</SelectItem>;
  }, [traineeCollections]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="h-[60svh]">
            <div className="h-full flex flex-col p-3">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="assigned_trainee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trainee</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trainee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>{traineeOptions}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="collection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Collection</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Exam Collection" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>{collectionOptions}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exam_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Exam Date</FormLabel>
                      <Input
                        className="cursor-pointer"
                        min={format(new Date(), "yyyy-MM-dd")}
                        placeholder="Exam Date"
                        type="date"
                        {...field}
                        value={
                          field.value
                            ? format(new Date(field.value), "yyyy-MM-dd")
                            : ""
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exam_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Time</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="time"
                            {...field}
                            className="cursor-pointer"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          min={30}
                          step={15}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum duration is 30 minutes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assigned_mentor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Mentor</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mentor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>{mentorOptions}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exam_details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[100px]"
                          placeholder="Add exam related notes here..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-2 flex gap-2 items-center">
                <Checkbox
                  checked={checked}
                  name="send-notification"
                  onClick={() => setChecked(!checked)}
                />
                <Label
                  htmlFor="send-notification"
                  onClick={() => setChecked(!checked)}
                >
                  Send update notification.
                </Label>
              </div>
            </div>
          </ScrollArea>

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling Exam...
              </>
            ) : type === "update" ? (
              "Update Exam"
            ) : (
              "Schedule Exam"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ExamSchedulingForm;
