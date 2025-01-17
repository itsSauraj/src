"use clinet";

import type { UUID } from "crypto";

import React from "react";

const Page = async ({ params }: { params: Promise<{ id: UUID }> }) => {
  const trainee_id = (await params).id;

  return <div>{trainee_id}</div>;
};

export default Page;
