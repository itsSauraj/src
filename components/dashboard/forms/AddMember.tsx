"use client";

import type { StoreDispatch, RootState } from "@/redux/store";
import type { members } from "@/types";
import type { IMemberForm } from "@/dependencies/yup";
import type { SetStateAction } from "react";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Input as CustomInput } from "@/components/ui/custom-input";
import { Calendar } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { memberSchema } from "@/dependencies/yup";
import { setAuthLoading } from "@/redux/slice/app";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// Lib function
import { cn } from "@/lib/utils";
// API function
import { addMember } from "@/lib/api";

const AddMember = ({
  type,
  setData,
  setState,
}: {
  type: members;
  setData: (value: SetStateAction<IMemberForm[]>) => void;
  setState: (value: boolean) => void;
}) => {
  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<StoreDispatch>();

  const form = useForm<IMemberForm>({
    resolver: yupResolver(memberSchema),
    defaultValues: {
      employee_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      joining_date: undefined,
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: IMemberForm) => {
    dispatch(setAuthLoading(true));
    data.joining_date = format(data.joining_date, "yyyy-MM-dd");
    const response: IMemberForm = await dispatch(addMember(data, type));

    setData((prev) => [...prev, response]);
    setState(false);
    dispatch(setAuthLoading(false));
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="employee_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Employee ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joining_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        variant="outline"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick joining date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value as any}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  error=""
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CustomInput
                  error=""
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            className="w-full"
            disabled={app.auth.isLoading}
            type="submit"
          >
            {app.auth.isLoading && <Loader2 className="animate-spin" />}
            {app.auth.isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddMember;
