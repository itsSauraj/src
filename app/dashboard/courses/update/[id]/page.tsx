import type { UUID } from "crypto";

import React from "react";

import UpdateFrom from "@/components/dashboard/forms/UpdateCourse";

const CourseUpdateView = async ({
  params,
}: {
  params: Promise<{ id: UUID }>;
}) => {
  const course_id = (await params).id;

  return <UpdateFrom />;
};

export default CourseUpdateView;
