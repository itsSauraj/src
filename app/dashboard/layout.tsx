"use client";

import type { ReduxStore } from "@/types/redux";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/dashboard";
import { StoreDispatch } from "@/redux/store";
import { validateToken } from "@/redux/slice/user";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: ReduxStore) => state.user);

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
