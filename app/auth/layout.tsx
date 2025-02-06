"use client";

import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { validateToken } from "@/redux/slice/user";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.token) {
      return;
    }

    dispatch(validateToken(user.token));
  }, []);

  useEffect(() => {
    if (user.token) {
      router.replace("/dashboard");
    }
  }, [user.token]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          alt="auth-background-image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          layout="fill"
          src="/images/auth-background.avif"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:max-h-[100svh] lg:overflow-y-scroll">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link className="flex items-center gap-2 font-medium" href="#">
            <div className="px-2 py-1 rounded-br-lg bg-primary rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
              <Image src="/abra-icon.png" alt="logo" height={25} width={25} />
            </div>
            Abra
          </Link>
        </div>
        <div className="flex h-full lg:h-[80svh] items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
