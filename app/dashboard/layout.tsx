"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/dashboard";
import { StoreDispatch } from "@/redux/store";
import { validateToken } from "@/redux/slice/user";
import { ReduxStore } from "@/types/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<StoreDispatch>();
  const user = useSelector((state: ReduxStore) => state.user);

  useEffect(() => {
    if (!user.token) {
      router.push("/auth/login");
    }

    dispatch(validateToken(user.token));
  }, []);

  useEffect(() => {
    if (!user.token) {
      router.push("/auth/login");
    }
  }, [user.token]);

  return (
    <SideBar>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </SideBar>
  );
};

export default DashboardLayout;
