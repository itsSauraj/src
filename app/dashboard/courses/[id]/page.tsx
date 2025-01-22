import type { UUID } from "crypto";

import React from "react";

import { RenderTableCourse } from "@/components/dashboard/tables";

const ClientCourseView = async ({
  params,
}: {
  params: Promise<{ id: UUID }>;
}) => {
  const collection_id = (await params).id;

  return <RenderTableCourse collection_id={collection_id} />;
};

export default ClientCourseView;
