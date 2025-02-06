"use client";

import type { RootState } from "@/redux/store";

import { useSelector } from "react-redux";

import ClientPage from "./_pages_layouts/trainee";
import AdminPage from "./_pages_layouts/admin";

const Page = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return null;

  const isTrainee = user.groups.includes("trainee");
  const isAdmin = user.groups.includes("admin");

  if (isTrainee) return <ClientPage />;
  if (isAdmin) return <AdminPage />;
};

export default Page;
