"use client";

import type { StoreDispatch, RootState } from "@/redux/store";
import type { LoginRequest } from "@/types/auth/actions";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";

import { loginSchema } from "@/dependencies/yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { logInUser } from "@/redux/slice/user";

export default function LoginFormPage() {
  const dispatch = useDispatch<StoreDispatch>();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  const form = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (formData: LoginRequest) => {
    try {
      await dispatch(logInUser(formData));
    } catch (error) {
      console.error("Login failed:", error); // eslint-disable-line
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    autoComplete="username"
                  />
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
                <div className="flex items-center justify-between">
                  <FormLabel className="text-black dark:text-white">
                    Password
                  </FormLabel>
                  {/* Uncomment if you want to add forgot password
                  <Link
                    className="text-sm text-muted-foreground hover:underline"
                    href="/auth/forgot-password"
                  >
                    Forgot password?
                  </Link>
                  */}
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            className="text-primary hover:underline underline-offset-4"
            href="/auth/signup"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
