"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import Loader from "@/components/ui/loader";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />;
    </div>
  );
};

export default Page;
