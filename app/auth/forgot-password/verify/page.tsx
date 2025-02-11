"use client";

import type { StoreDispatch, RootState } from "@/redux/store";
import type { OTPRequest } from "@/dependencies/yup";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { otpSchema } from "@/dependencies/yup";
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
import { verifyOTP } from "@/lib/api";

export function VerifyOTPPage() {
  const dispatch = useDispatch<StoreDispatch>();
  const router = useRouter();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);

  const form = useForm<OTPRequest>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (formData: OTPRequest) => {
    const data = await dispatch(verifyOTP(formData.otp));

    if (data) {
      router.push("/auth/forgot-password/reset");
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6")}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Verify Reset Code</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Reset Code
                </FormLabel>
                <FormControl>
                  <Input
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    {...field}
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
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          Didn&apos;t receive the code?{" "}
          <Button
            className="p-0 text-primary hover:underline underline-offset-4"
            variant="link"
            onClick={() => {
              // Add resend code logic here
            }}
          >
            Resend
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default VerifyOTPPage;
