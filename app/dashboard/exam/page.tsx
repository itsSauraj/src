"use client";

import { useSearchParams } from "next/navigation";

import TraineePage from "./_pages_layouts/trainee";
import MentorPage from "./_pages_layouts/mentor";
import AdminPage from "./_pages_layouts/admin";

import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
  const searchParams = useSearchParams();

  const user = searchParams.get("user");

  if (!user) return null;

  let content;

  switch (user) {
    case "trainee":
      content = <TraineePage />;
      break;
    case "mentor":
      content = <MentorPage />;
      break;
    case "admin":
      content = <AdminPage />;
      break;
    default:
      content = null;
  }

  return <>{content}</>;
};

export default Page;
