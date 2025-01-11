"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import { validateToken } from "@/lib/auth/actions";
import { StoreDispatch } from "@/redux/store";
import { setToken } from "@/redux/slice/user";
import { GradientCard } from "@/components/ui/GradientCard";
import { ReduxStore } from "@/types/redux";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: ReduxStore) => state.user);

  useEffect(() => {
    const validate = async () => {
      try {
        const new_token = await validateToken(user.token as string);

        dispatch(setToken(new_token));
        router.push("/");
      } catch (error: any) {
        router.push("/auth/login");
      }
    };

    if (user.token) validate();

    return () => {
      validate;
    };
  }, []);

  useEffect(() => {
    if (user.token) {
      router.push("/");
    }
  }, [user.token]);

  const pathname = usePathname();

  const title = pathname === "/auth/login" ? "Login" : "Register";

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <GradientCard title={title}>{children}</GradientCard>
    </div>
  );
};

export default AuthLayout;
