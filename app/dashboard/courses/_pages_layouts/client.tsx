"use client";

import type { StoreDispatch, RootState } from "@/redux/store";
import type { MembersCollectionGroup } from "@/types/dashboard/view";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@nextui-org/react";

import {
  CollectionCard,
  CollectionCardSkeleton,
  CollectionCourseView,
} from "@/components/dashboard/course/client/collectionCard";
import { StatusBadge } from "@/components/collection/status-badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import MyDrawer from "@/components/ui/next-drawer";
// API
import { getTarineeAggignedCollection } from "@/lib/api";

const ClientPage = () => {
  const [assignedCollections, setAssignedCollections] = useState<
    MembersCollectionGroup | undefined
  >();
  const isLoading = useSelector((state: RootState) => state.app.auth.isLoading);
  const dispatch = useDispatch<StoreDispatch>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openedCollection, setOpenedCollection] = useState<number>(0);

  useEffect(() => {
    dispatch(getTarineeAggignedCollection()).then((data) => {
      setAssignedCollections(data);
    });
  }, []);

  const handelExplore = (index: number) => {
    setOpenedCollection(index);
    onOpenChange();
  };

  if (isLoading) {
    return (
      <ScrollArea className="absolute h-[90svh]">
        <div className="max-h-full flex justify-start items-center gap-4 p-4 flex-wrap">
          <CollectionCardSkeleton />
          {Array.from({ length: 7 }).map((_, index) => (
            <CollectionCardSkeleton key={index} />
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (!isLoading && !assignedCollections) {
    return (
      <div className="h-full flex justify-between items-center gap-4 p-4">
        <p className="text-gray-700 dark:text-gray-300 text-center w-full">
          You are not assigned to any courses collection yet as you mentor to
          assign one.
        </p>
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="absolute h-[90svh]">
        <div className="max-h-full flex justify-start items-center gap-4 p-4 flex-wrap">
          <CollectionCard
            collections={assignedCollections?.collections || []}
            onExplore={handelExplore}
          />
        </div>
      </ScrollArea>
      {(assignedCollections?.collections?.length ?? 0) > 0 && (
        <MyDrawer
          isOpen={isOpen}
          title={
            assignedCollections?.collections ? (
              <div className="flex justify-between items-center">
                <div className="text-lg truncate">
                  {
                    assignedCollections?.collections[openedCollection]
                      .collection.title
                  }
                </div>
                <div className="flex items-center p-3">
                  <StatusBadge
                    status={
                      assignedCollections?.collections[openedCollection]
                        .completed
                        ? "completed"
                        : assignedCollections?.collections[openedCollection]
                              .started_on
                          ? "started"
                          : "not-started"
                    }
                  />
                </div>
              </div>
            ) : (
              ""
            )
          }
          onOpenChange={onOpenChange}
        >
          <CollectionCourseView
            metadata={
              assignedCollections
                ? assignedCollections?.collections[openedCollection]
                : undefined
            }
            started_courses={assignedCollections?.started_courses ?? {}}
          />
        </MyDrawer>
      )}
    </>
  );
};

export default ClientPage;
