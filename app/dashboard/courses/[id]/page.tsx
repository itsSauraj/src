import type { UUID } from "crypto";

import React from "react";

const ClientCourseView = async ({
  params,
}: {
  params: Promise<{ id: UUID }>;
}) => {
  const course_id = (await params).id;

  return <div>{course_id}</div>;
};

export default ClientCourseView;
