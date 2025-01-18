"use client";

import type { Course } from "@/types/dashboard/view";
import type { CollectionFormData } from "@/dependencies/yup";
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

  const [collection, setCollection] = useState<CollectionFormData[] | null>(
    null,
  );
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);

  useEffect(() => {
    dispatch(getCourseCollectionDetails(id)).then((data) => {
      setCollection(data);
    });
    dispatch(getCourses()).then((data) => {
      setAvailableCourses(data);
    });
  }, []);

  const handleUpdate = async (data: any) => {
    // Update collection logic here
  };

  const handleDelete = async () => {
    // Delete collection logic here
  };

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
      collection={collection as any}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
};

export default ContentLoader;
