"use client";

import type { UUID } from "crypto";
import type { StoreDispatch, RootState } from "@/redux/store";
import type { ExamScheduleRequest, IMemberForm } from "@/dependencies/yup";
import type { ResponseMiniFiedTraineeCollectionData } from "@/types/dashboard/report";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, Clock } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { examScheduleSchema } from "@/dependencies/yup";
// APIS
import {
  getMentors,
  getTrainees,
  getMiniFiedTraineeCollectionData,
} from "@/lib/api";

const ExamSchedulingForm = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);
  const [mentors, setMentors] = React.useState<IMemberForm[]>([]);
  const [trainees, setTrainees] = React.useState<IMemberForm[]>([]);
  const [traineeCollections, setTraineeCollections] =
    React.useState<ResponseMiniFiedTraineeCollectionData | null>(null);

  const form = useForm<ExamScheduleRequest>({
    resolver: yupResolver(examScheduleSchema),
    defaultValues: {
      assigned_trainee: "",
      collection: "",
      exam_date: undefined,
      exam_time: "",
      duration: 60,
      assigned_mentor: "",
      exam_details: "",
    },
    mode: "onChange",
  });

  const onSubmit = React.useCallback(
    async (formData: ExamScheduleRequest) => {
      try {
        // await dispatch(scheduleExam(formData));
        console.log("Exam scheduled:", formData);
      } catch (error) {
      console.error("Failed to schedule exam:", error); // eslint-disable-line
      }
    },
    [form],
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
          setTraineeCollections(data);
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
                          <Input type="time" {...field} className="pl-10" />
                          <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
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
            </div>
          </ScrollArea>

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling Exam...
              </>
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
