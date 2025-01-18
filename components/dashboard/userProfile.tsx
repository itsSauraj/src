"use client";

import type { StoreDispatch } from "@/redux/store";
import type { UUID } from "crypto";
import type { ResponseMember } from "@/types/dashboard/view";
import type { ChangeEvent } from "react";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdSaveAs } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "@/components/ui/loader";
// skeleton
import { UserProfileSkeleton } from "@/components/dashboard/skeleton/userProfile";
// API
import { getMemberInfo } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function UserPage({
  className,
  memberId,
}: {
  className?: string;
  memberId: UUID;
}) {
  const dispatch = useDispatch<StoreDispatch>();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<ResponseMember>();

  useEffect(() => {
    dispatch(getMemberInfo(memberId)).then((data: ResponseMember) => {
      setUserData(data);
    });
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prevData) => {
      if (!prevData) return prevData;

      return { ...prevData, [name]: value };
    });
  };

  useEffect(() => {
    if (isEditing) return;
    console.log(userData);
  }, [isEditing]);

  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])|_/g, " $1")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!userData) {
    return <UserProfileSkeleton className={cn(className)} />;
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">
          User Information
        </CardTitle>
        <div className="flex gap-2">
          <Button
            className="px-3"
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <MdSaveAs /> : <MdEdit />}
          </Button>
          <Button className="px-3" variant="destructive">
            <MdDelete />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4">
            {Object.entries(userData).map(([key, value]) => {
              if (key === "id" || key === "groups") return null;

              return (
                <div key={key} className="space-y-2 px-1">
                  <Label className="text-sm font-medium" htmlFor={key}>
                    {formatLabel(key)}
                  </Label>
                  {isEditing ? (
                    <Input
                      className="w-full h-10"
                      id={key}
                      name={key}
                      placeholder={formatLabel(key)}
                      value={value}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div className="rounded-lg bg-muted p-2 text-sm h-10 flex items-center">
                      {value || (
                        <span className="text-gray-500">
                          No {formatLabel(key)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
