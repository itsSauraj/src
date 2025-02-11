"use client";

import type { StoreDispatch, RootState } from "@/redux/store";
import type { EmailRequest } from "@/dependencies/yup";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { emailSchema } from "@/dependencies/yup";
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
//apis
import { sendResetEmail } from "@/lib/api";

const ForgotPasswordEmailPage = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  const form = useForm<EmailRequest>({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (formData: EmailRequest) => {
    const data = await dispatch(sendResetEmail(formData.email));

    if (data) {
      router.push("/auth/forgot-password/verify");
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a reset code
          </p>
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    {...field}
                    autoComplete="email"
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
                Sending...
              </>
            ) : (
              "Send Reset Code"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link
            className="text-primary hover:underline underline-offset-4"
            href="/auth/login"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordEmailPage;
