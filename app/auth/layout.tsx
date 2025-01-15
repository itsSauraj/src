"use client";

import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import { validateToken } from "@/redux/slice/user";
import { GradientCard } from "@/components/ui/GradientCard";

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
    <div className="w-screen h-screen flex items-center justify-center">
      <GradientCard title={title}>{children}</GradientCard>
    </div>
  );
};

export default AuthLayout;
