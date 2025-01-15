"use client";

import type { StoreDispatch, RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/dashboard";
import { validateToken } from "@/redux/slice/user";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.token) {
      router.replace("/auth/login");
    }

    dispatch(validateToken(user.token));
  }, []);

  useEffect(() => {
    if (!user.token) {
      router.replace("/auth/login");
    }
  }, [user.token]);

  return <SideBar>{children}</SideBar>;
};

export default DashboardLayout;
