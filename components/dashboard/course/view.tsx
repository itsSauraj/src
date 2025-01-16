"use client";

import type { StoreDispatch } from "@/redux/store";

import { UUID } from "crypto";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { CourseLayout } from "./structure";

import { getCourseDetails } from "@/lib/api";
import Loader from "@/components/ui/loader";

export default function ViewCourse({ courseId }: { courseId: UUID }) {
  const [courseDetails, CourseDetails] = useState<any>(null);
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(getCourseDetails(courseId)).then((data) => {
      CourseDetails(data);
    });
  }, []);

  if (!courseDetails || courseDetails === null || courseDetails.length === 0) {
    return <Loader />;
  }

  return <CourseLayout course={courseDetails} />;
}
