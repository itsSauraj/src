"use client";

import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

import { validateToken } from "@/redux/slice/user";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
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

  const title = pathname === "/auth/login" ? "Login" : "Register";

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:max-h-[100svh] lg:overflow-y-scroll">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link className="flex items-center gap-2 font-medium" href="#">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Abra
          </Link>
        </div>
        <div className="flex lg:h-[80svh] items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
