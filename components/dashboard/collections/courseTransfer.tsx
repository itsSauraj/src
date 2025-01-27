"use client";

import type { StoreDispatch } from "@/redux/store";
import type { UUID } from "crypto";
import type {
  MiniCollection,
  TrainingReportData,
  ResponseMiniFiedTraineeCollectionData,
} from "@/types/dashboard/report";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Empty } from "antd";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
//utils
import { cn } from "@/lib/utils";
// APIs
import {
  getMiniFiedTraineeCollectionData,
  assignCourseCollection,
  deassignCourseCollection,
  getTraineeReport,
} from "@/lib/api";

export default function CourseTransfer({
  trainee_id,
  setTraineeReport,
}: {
  trainee_id: UUID;
  setTraineeReport: (data: TrainingReportData) => void;
}) {
  const [availableCourses, setAvailableCourses] = useState<
    MiniCollection[] | undefined
  >();
  const [assignedCourses, setAssignedCourses] = useState<
    MiniCollection[] | undefined
  >();

  const [selectedAvailable, setSelectedAvailable] = useState<UUID[]>([]);
  const [selectedAssigned, setSelectedAssigned] = useState<UUID[]>([]);
  const [searchLeft, setSearchLeft] = useState("");
  const [searchRight, setSearchRight] = useState("");
  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(getMiniFiedTraineeCollectionData(trainee_id)).then(
      (data: ResponseMiniFiedTraineeCollectionData) => {
        setAvailableCourses(data.available_collections);
        setAssignedCourses(data.assigned_collections);
      },
    );
  }, []);

  const handleTransferToAssigned = () => {
    dispatch(assignCourseCollection(trainee_id, selectedAvailable)).then(
      (data: Boolean) => {
        if (data) {
          const coursesToTransfer =
            availableCourses?.filter((course) =>
              selectedAvailable.includes(course.id as UUID),
            ) || [];

          setAssignedCourses([
            ...(assignedCourses || []),
            ...coursesToTransfer,
          ]);
          setAvailableCourses(
            (availableCourses ?? []).filter(
              (course) => !selectedAvailable.includes(course.id as UUID),
            ),
          );
          setSelectedAvailable([]);
        }
        dispatch(getTraineeReport(trainee_id)).then((data) => {
          setTraineeReport(data);
        });
      },
    );
  };

  const handleTransferToAvailable = () => {
    dispatch(deassignCourseCollection(trainee_id, selectedAssigned)).then(
      (data: Boolean) => {
        if (data) {
          const coursesToTransfer = (assignedCourses ?? []).filter((course) =>
            selectedAssigned.includes(course.id as UUID),
          );

          setAvailableCourses([
            ...(availableCourses ?? []),
            ...coursesToTransfer,
          ]);
          setAssignedCourses(
            (availableCourses ?? []).filter(
              (course) => !selectedAssigned.includes(course.id as UUID),
            ),
          );
          setSelectedAssigned([]);
        }
        dispatch(getTraineeReport(trainee_id)).then((data) => {
          setTraineeReport(data);
        });
      },
    );
  };

  const CourseList = ({
    courses,
    selected,
    setSelected,
    searchValue,
  }: {
    courses: any[];
    selected: UUID[];
    setSelected: (ids: UUID[]) => void;
    searchValue: string;
  }) => {
    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    if (filteredCourses.length === 0) {
      return (
        <div className="flex items-center justify-center h-[300px]">
          <Empty
            description="No Collections Found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      );
    }

    return (
      <ScrollArea className="h-[300px] w-full rounded-md border">
        <div className="flex items-center space-x-2 hover:bg-neutral-500/30 px-3 transition-all ease-linear duration-100">
          <Checkbox
            checked={selected.length === filteredCourses.length}
            className="peer"
            id={"all"}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelected(filteredCourses.map((course) => course.id));
              } else {
                setSelected([]);
              }
            }}
          />
          <label
            className="text-sm font-medium leading-none 
            peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full h-full px-2 py-3"
            htmlFor="all"
          >
            Select All
          </label>
        </div>
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={cn(
              "flex items-center space-x-2 hover:bg-neutral-500/30 px-3 transition-all ease-linear duration-100",
              { "bg-neutral-500/30": selected.includes(course.id) },
            )}
          >
            <Checkbox
              checked={selected.includes(course.id)}
              id={course.id}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelected([...selected, course.id]);
                } else {
                  setSelected(selected.filter((id) => id !== course.id));
                }
              }}
            />
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
              w-full h-full px-2 py-3"
              htmlFor={course.id}
            >
              {course.title}
            </label>
          </div>
        ))}
      </ScrollArea>
    );
  };

  return (
    <div className="flex flex-col space-y-8 p-6">
      <div className="flex justify-between space-x-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Available Courses</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Search courses..."
                value={searchLeft}
                onChange={(e) => setSearchLeft(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <CourseList
              courses={availableCourses || []}
              searchValue={searchLeft}
              selected={selectedAvailable}
              setSelected={setSelectedAvailable}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col justify-center space-y-4">
          <Button
            disabled={selectedAvailable.length === 0}
            onClick={handleTransferToAssigned}
          >
            <FaCaretRight />
          </Button>
          <Button
            disabled={selectedAssigned.length === 0}
            onClick={handleTransferToAvailable}
          >
            <FaCaretLeft />
          </Button>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Assigned Courses</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Search courses..."
                value={searchRight}
                onChange={(e) => setSearchRight(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <CourseList
              courses={assignedCourses || []}
              searchValue={searchRight}
              selected={selectedAssigned}
              setSelected={setSelectedAssigned}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
