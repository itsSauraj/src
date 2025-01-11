"use client";

import React from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import { GradientCard } from "@/components/ui/GradientCard";
import { ReduxStore } from "@/types/redux";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const user = useSelector((state: ReduxStore) => state.user);

  const title = pathname === "/auth/login" ? "Login" : "Register";

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <GradientCard title={title}>{children}</GradientCard>
    </div>
  );
};

export default AuthLayout;
