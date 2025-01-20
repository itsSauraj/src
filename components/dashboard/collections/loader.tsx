"use client";

import type { Course, CourseCollection } from "@/types/dashboard/view";
import type { StoreDispatch } from "@/redux/store";

import { UUID } from "crypto";

import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

import { CollectionView } from "./component";

// APIs
import { getCourseCollectionDetails, getCourses } from "@/lib/api";
//components
import { CollectionViewSkeleton } from "@/components/dashboard/skeleton";

export const ContentLoader = ({ id }: { id: UUID }) => {
  const dispatch = useDispatch<StoreDispatch>();

  const [collection, setCollection] = useState<CourseCollection | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);

  useEffect(() => {
    dispatch(getCourseCollectionDetails(id)).then((data) => {
      setCollection(data);
    });
    dispatch(getCourses()).then((data) => {
      setAvailableCourses(data);
    });
  }, []);

  if (!collection) {
    return (
      <>
        <CollectionViewSkeleton />
      </>
    );
  }

  return (
    <CollectionView
      availableCourses={availableCourses}
      collection={collection}
      setCollection={setCollection}
    />
  );
};

export default ContentLoader;
