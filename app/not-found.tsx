"use client";

import type { RootState } from "@/redux/store";

import React from "react";
import Link from "next/link";
import { Result } from "antd";
import { useSelector } from "react-redux";

import { buttonVariants } from "@/components/ui/button";

const Custom404 = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Result
      extra={
        <Link
          className={`${buttonVariants()}`}
          href={user.token ? "/dashboard" : "/"}
        >
          Back Home
        </Link>
      }
      status="404"
      subTitle="Sorry, the page you visited does not exist."
      title="404"
    />
  );
};

export default Custom404;
