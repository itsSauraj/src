"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import { SideBar } from "@/components/dashboard";
import { PagePanel } from "@/components/dashboard/panel";
import { StoreDispatch } from "@/redux/store";
import { validateToken } from "@/redux/slice/user";
import { ReduxStore } from "@/types/redux";
import { generateBreadcrumbs } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
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

  const breadCrumbItems = generateBreadcrumbs(pathname);

  return (
    <SideBar>
      <div className="flex flex-1 py-3">
        <div className="flex flex-col flex-1 ">
          <PagePanel breadCrumb={breadCrumbItems} className="rounded-tl-2xl" />
          <div className="w-full h-full p-4 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-tl-2xl">
            {children}
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default DashboardLayout;
