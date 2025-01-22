import type { UUID } from "crypto";

import React from "react";

import { RenderTableCourse } from "@/components/dashboard/tables";

const ClientCourseView = async ({
  params,
}: {
  params: Promise<{ id: UUID }>;
}) => {
  const course_id = (await params).id;

  return <RenderTableCourse course_id={course_id} />;
};

export default ClientCourseView;
