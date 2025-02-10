"use client";

import type { PasswordSchema } from "@/dependencies/yup";
import type { StoreDispatch } from "@/redux/store";

import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoAlertCircle } from "react-icons/io5";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { passwordSchema } from "@/dependencies/yup";
//APIS
import { changePassword } from "@/lib/api";

const ChangePassword = () => {
  const dispatch = useDispatch<StoreDispatch>();

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  const onPasswordSubmit = async (data: PasswordSchema) => {
    dispatch(changePassword(data));
    passwordForm.reset();
  };

  return (
    <Card className="w-full lg:max-w-[450px]">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <p className="text-sm text-gray-500">
          Ensure your account is secure by using a strong password
        </p>
      </CardHeader>
      <CardContent className="flex flex-row md:flex-col gap-4">
        <Form {...passwordForm}>
          <form
            className="space-y-2 flex flex-col w-full"
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          >
            <FormField
              control={passwordForm.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Current Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="self-end"
              disabled={passwordForm.formState.isSubmitting}
              type="submit"
            >
              {passwordForm.formState.isSubmitting
                ? "Updating..."
                : "Update Password"}
            </Button>
          </form>
        </Form>
        <Alert
          className="flex flex-col gap-1 justify-center"
          variant="destructive"
        >
          <IoAlertCircle className="h-4 w-4" />
          <AlertTitle>Delete Account</AlertTitle>
          <AlertDescription>
            Once you delete your account, there is no going back. Please be
            certain.
          </AlertDescription>
          <Button className="self-end" variant="destructive">
            Delete Account
          </Button>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
