"use client";

import type { UUID } from "crypto";
import type { Notification } from "@/types/redux";

import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

import { ReadOneButton, ReadAllButton } from "./readButtons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateToolTipT } from "@/components/collection/tooltip";
//utils
import { cn } from "@/lib/utils";

export const NotiicationBell = ({
  notify,
  count,
}: {
  notify: boolean;
  count: number;
}) => {
  return (
    <CreateToolTipT
      content="Notifications"
      trigger={
        <div
          className="relative hover:bg-primary-200 p-2 rounded-full dark:hover:bg-neutral-700
        trainstion-all duration-200 ease-linear border-primary-200 dark:border-neutral-700"
        >
          <IoIosNotifications className="text-white text-[1rem] md:text-[1.5rem] lg:text-[2rem]" />
          {notify && (
            <div
              className={cn(
                "pointer-events-none",
                "text-[12px] h-5 w-5 flex text-center absolute top-0 bg-yellow-400",
                "border-1 border-black/20 rounded-full px-1 dark:text-black",
                count > 99
                  ? "right-0 w-6 h-6"
                  : count > 9
                    ? "right-0 w-5 h-5"
                    : "right-0 flex items-center justify-center",
              )}
            >
              <span className="text-center flex items-center justify-center text-[8px] lg:text-md">
                {count > 99 ? "99+" : count}
              </span>
            </div>
          )}
        </div>
      }
    />
  );
};

export const NotificationGrid = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  return (
    <div className="max-h-80 overflow-y-scroll rounded-md no-scrollbar flex flex-col gap-1">
      {notifications.slice(0, 3).map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export const AllNotificationDialog = ({
  state,
  setState,
  className,
  notifications,
}: {
  state: boolean;
  setState: (value: boolean) => void;
  className?: string;
  notifications: Notification[];
}) => {
  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogContent
        className={cn(
          "sm:h-[100svh] md:h-[75svh] lg:h-[60svh] max-w-[425px] lg:max-w-[520px] rounded-md",
          className,
        )}
      >
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="captalize w-max">
            All Notifications
          </DialogTitle>
          <ReadAllButton />
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-scroll rounded-md no-scrollbar flex flex-col gap-1">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              inDetail
              notification={notification}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Utils functions
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const NotificationCard = ({
  notification,
  inDetail = false,
}: {
  notification: Notification;
  inDetail?: boolean;
}) => {
  const router = useRouter();

  const handleNotificationClick = (notification: Notification) => {
    switch (notification.type) {
      case "success":
        break;
    }
  };

  return (
    <Card
      key={notification.id}
      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
        !notification.read ? "border-l-4 border-l-primary" : ""
      }`}
      onClick={() => handleNotificationClick(notification)}
    >
      <CardContent className="p-2">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                (process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
                notification.sender.avatar
              }
            />
            <AvatarFallback className="uppercase">
              {notification.sender.name &&
                getInitials(notification.sender.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between items-start relative">
              <div>
                <p className="font-medium line-clamp-1">{notification.title}</p>
                <p
                  className={cn(
                    "text-xs text-muted-foreground",
                    inDetail ? "line-clamp-3" : " line-clamp-2",
                  )}
                >
                  {notification.message}
                </p>
              </div>
              <ReadOneButton id={notification.id as UUID} />
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                {format(parseISO(notification.created_at), "PPp")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
