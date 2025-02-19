"use client";

import type { RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/dashboard/dashboardSidebar";
import { useNotifications } from "@/hooks/useNotifications";
import { siteConfig } from "@/config/site";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { notifications, unreadCount, isConnected, error, isLoading } =
    useNotifications();

  useEffect(() => {
    if (!user.token) {
      router.push("/auth/login");
    }
  }, [user.token]);

  if (!isMounted) return null;

  return (
    <SideBar>
      {/* <div className="relative pointer-events-none">
        <div
          className="absolute
         top-0 left-0 z-0 w-[110svw] h-full flex flex-wrap gap-10">
          {Array.from({ length: 300 }).map((_, index) => (
            <span
              key={index}
              className="opacity-30 pointer-events-none selection:not-sr-only
              text:neutral-400 dark:text-gray-500
            -rotate-[30deg] text-[10px]
          "
            >
              {user.user.first_name} {user.user.last_name}
            </span>
          ))}
        </div>
      </div> */}
      {children}
    </SideBar>
  );
};

export default DashboardLayout;
