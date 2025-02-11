"use client";

import type { UUID } from "crypto";
import type { Course, CourseCollection } from "@/types/dashboard/view";
import type { StoreDispatch } from "@/redux/store";

import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";

import { CollectionView } from "./component";

//components
import { CollectionViewSkeleton } from "@/components/dashboard/skeleton";
import MyDrawer from "@/components/collection/mySheetDrawer";
import ViewCourse from "@/components/dashboard/course/view";
// APIs
import { getCourseCollectionDetails, getCourses } from "@/lib/api";

export const ContentLoader = ({ id }: { id: UUID }) => {
  const dispatch = useDispatch<StoreDispatch>();

  const [collection, setCollection] = useState<CourseCollection | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openCourseID, setOpenCourseID] = useState<UUID | null>(null);

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

  const handleOnOpenChange = (id: UUID) => {
    onOpen();
    setOpenCourseID(id);
  };

  return (
    <>
      <CollectionView
        availableCourses={availableCourses}
        collection={collection}
        handleOnOpenChange={handleOnOpenChange}
        setCollection={setCollection}
      />
      <MyDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <ViewCourse courseId={openCourseID as UUID} />
      </MyDrawer>
    </>
  );
};

export default ContentLoader;
