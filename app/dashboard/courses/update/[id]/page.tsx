/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import type { UUID } from "crypto";

import React from "react";

const CourseUpdateView = async ({
  params,
}: {
  params: Promise<{ id: UUID }>;
}) => {
  const course_id = (await params).id;

  return <>Comming soon</>;
  // return <UpdateFrom />;
};

export default CourseUpdateView;
