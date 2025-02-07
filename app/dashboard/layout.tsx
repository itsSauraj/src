"use client";

import type { RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { SideBar } from "@/components/dashboard/dashboardSidebar";
import { useNotifications } from "@/hooks/useNotifications";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useNotifications();

  useEffect(() => {
    if (!user.token) {
      router.push("/auth/login");
    }
  }, [user.token]);

  if (!isMounted) return null;

  return <SideBar>{children}</SideBar>;
};

export default DashboardLayout;
