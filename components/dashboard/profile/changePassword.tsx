"use client";

import type { PasswordSchema } from "@/dependencies/yup";
import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { MyAlertDialog } from "@/components/collection/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { passwordSchema } from "@/dependencies/yup";
//APIS
import { changePassword, deleteProfile } from "@/lib/api";

const ChangePassword = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const [openAlert, setOpenAlert] = useState(false);
  const [deleteChecked, setDeleteChecked] = useState(false);

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

  const onConfirmDelete = () => {
    setOpenAlert(false);
    dispatch(deleteProfile());
  };

  return (
    <>
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
          {!(
            user?.groups && ["trainee", "mentor"].includes(user.groups[0])
          ) && (
            <Alert
              className="flex flex-col gap-1 justify-center"
              variant="destructive"
            >
              <IoAlertCircle className="h-4 w-4" />
              <AlertTitle>Delete Account</AlertTitle>
              <AlertDescription>
                Once you delete your account, there is no going back. Please be
                certain.
                <div className="flex items-center gap-2">
                  <div className="flex items-center me-4">
                    <Checkbox
                      checked={deleteChecked}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      id="red-checkbox"
                      onClick={() => setDeleteChecked(!deleteChecked)}
                    />
                    <label
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="red-checkbox"
                    >
                      I understand the consequences
                    </label>
                  </div>
                </div>
              </AlertDescription>
              <div className="flex justify-end gap-2">
                <Button
                  className="self-end"
                  disabled={!deleteChecked}
                  variant="destructive"
                  onClick={() => setOpenAlert(true)}
                >
                  Delete Account
                </Button>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>
      <MyAlertDialog
        description="Are you sure you want to delete your?"
        setOpen={setOpenAlert}
        title="Delete my account"
        onContinue={onConfirmDelete}
        onOpen={openAlert}
      />
    </>
  );
};

export default ChangePassword;
