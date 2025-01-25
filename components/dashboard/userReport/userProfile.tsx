"use client";

import type { ResponseMember } from "@/types/dashboard/view";
import type { StoreDispatch } from "@/redux/store";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdSaveAs } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { toast } from "sonner";

// yup
import { userUpdateSchema } from "@/dependencies/yup";
// UI Components 1
import { CreateToolTipT } from "@/components/collection/tooltip";
// UI Components 2
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MyAlertDialog } from "@/components/collection/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
// skeleton
import { UserProfileSkeleton } from "@/components/dashboard/skeleton/userProfile";
// api
import { deleteMember, updateUserDetails } from "@/lib/api";

export default function UserPage({
  className,
  traineeData,
}: {
  className?: string;
  traineeData: ResponseMember;
}) {
  const dispatch = useDispatch<StoreDispatch>();
  const router = useRouter();

  const [information, setInformation] = useState(traineeData);
  const [openAlert, setOpenAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Prepare initial form values
  const defaultValues = {
    ...information,
    birth_date: information.birth_date
      ? new Date(information.birth_date)
      : null,
    joining_date: information.joining_date
      ? new Date(information.joining_date)
      : null,
  };

  const form = useForm({
    resolver: yupResolver(userUpdateSchema) as any,
    defaultValues,
  });

  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])|_/g, " $1")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // On form submission
  function onSubmit(data: any) {
    const formattedData = {
      ...data,
      birth_date: data.birth_date
        ? data.birth_date.toISOString().split("T")[0]
        : null,
      joining_date: data.joining_date
        ? data.joining_date.toISOString().split("T")[0]
        : null,
    };

    dispatch(updateUserDetails(information.id, formattedData)).then((data) => {
      setIsEditing(false);
      setInformation(data);
      form.reset({
        ...data,
        birth_date: data.birth_date ? new Date(data.birth_date) : null,
        joining_date: data.joining_date ? new Date(data.joining_date) : null,
      });
    });
  }

  // Delete mentor handler
  const deleteMentor = () => {
    dispatch(deleteMember(information.id)).then(() => {
      router.push("/dashboard/trainees");
    });
  };

  const renderDateInput = (name: string, control: any) => {
    return (
      <Controller
        control={control}
        name={name as keyof ResponseMember}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
                variant={"outline"}
              >
                {field.value ? (
                  field.value.toLocaleDateString()
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                initialFocus
                disabled={(date) => date > new Date()}
                mode="single"
                selected={field.value as Date}
                onSelect={(date) => field.onChange(date)}
              />
            </PopoverContent>
          </Popover>
        )}
      />
    );
  };

  if (!information) {
    return <UserProfileSkeleton className={cn(className)} />;
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">
          User Information
        </CardTitle>
        <div className="flex gap-2">
          {isEditing && (
            <CreateToolTipT
              content="Cancel"
              trigger={
                <Button
                  className="px-3 bg-neutral-500"
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => {
                    form.reset(defaultValues);
                    setIsEditing(false);
                  }}
                >
                  <X />
                </Button>
              }
            />
          )}{" "}
          <CreateToolTipT
            content={!isEditing ? "Edit" : "Save"}
            trigger={
              <Button
                className={cn("px-3", !isEditing ? "bg-white" : "bg-blue-500")}
                variant={isEditing ? "default" : "outline"}
                onClick={() => {
                  if (!isEditing) {
                    setIsEditing(true);
                  } else {
                    form.trigger().then((isValid) => {
                      isValid && onSubmit(form.getValues());
                      !isValid && toast.error("Please check the form fields");
                    });
                  }
                }}
              >
                {isEditing ? <MdSaveAs /> : <MdEdit />}
              </Button>
            }
          />
          <CreateToolTipT
            content="Delete"
            trigger={
              <Button
                className="px-3"
                variant="destructive"
                onClick={() => setOpenAlert(true)}
              >
                <MdDelete />
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="h-[70vh] pr-4 pb-6">
            <div className="space-y-4">
              {Object.entries(information).map(([key, value]) => {
                // Skip unnecessary fields
                if (key === "id" || key === "groups") return null;

                // Special handling for date fields
                const isDateField =
                  key === "birth_date" || key === "joining_date";

                return (
                  <div key={key} className="space-y-2 px-1">
                    <Label className="text-sm font-medium" htmlFor={key}>
                      {formatLabel(key)}
                    </Label>
                    {isEditing ? (
                      <>
                        {isDateField ? (
                          renderDateInput(key, form.control)
                        ) : (
                          <Input
                            className="w-full h-10"
                            id={key}
                            {...form.register(key as keyof ResponseMember)}
                            placeholder={formatLabel(key)}
                          />
                        )}
                        {form.formState.errors[key as keyof ResponseMember] && (
                          <p className="text-red-500 text-xs">
                            {
                              form.formState.errors[key as keyof ResponseMember]
                                ?.message
                            }
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="rounded-lg bg-muted p-2 text-sm h-10 flex items-center">
                        {isDateField && value
                          ? new Date(value).toLocaleDateString()
                          : value || (
                              <span className="text-gray-500">
                                No {formatLabel(key)}
                              </span>
                            )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </form>

        <MyAlertDialog
          description={`Are you sure you want to 
            delete ${information.first_name + " " + information.last_name} trainee?`}
          setOpen={setOpenAlert}
          title="Delete Trainee"
          onContinue={deleteMentor}
          onOpen={openAlert}
        />
      </CardContent>
    </Card>
  );
}
