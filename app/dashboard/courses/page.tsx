"use client";

import type { RootState } from "@/redux/store";

import { useSelector } from "react-redux";

import ClientPage from "./_pages_layouts/client";
import AdminPage from "./_pages_layouts/admin";

export const Page = () => {
  const user_group = useSelector((state: RootState) => state.user.user.groups);

  const isTrainee = user_group.includes("trainee");
  const isAdmin = user_group.includes("admin");

  if (isTrainee) return <ClientPage />;
  if (isAdmin) return <AdminPage />;
};

export default Page;
