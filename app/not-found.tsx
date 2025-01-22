import React from "react";
import Link from "next/link";
import { Result } from "antd";

import { buttonVariants } from "@/components/ui/button";

const Custom404 = () => (
  <Result
    extra={
      <Link className={`${buttonVariants()}`} href={"/"}>
        Back Home
      </Link>
    }
    status="404"
    subTitle="Sorry, the page you visited does not exist."
    title="404"
  />
);

export default Custom404;
