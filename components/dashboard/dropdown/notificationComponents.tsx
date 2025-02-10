"use client";

import type { Notification } from "@/types/redux";
import type { UUID } from "crypto";

import * as React from "react";
import { IoIosNotifications } from "react-icons/io";

import { ReadOneButton, ReadAllButton } from "./readButtons";

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

export const NotificationCard = ({
  notification,
  inDetail = false,
}: {
  notification: Notification;
  inDetail?: boolean;
}) => (
  <div
    className="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 border-b-1 relative
    trainstion-all duration-200 ease-linear border-neutral-200 dark:border-neutral-700
  "
  >
    <ReadOneButton id={notification.id as UUID} />
    <h3 className="text-sm font-semibold">
      {notification.title ?? "Notification"}
    </h3>
    <span className={cn("text-[10px]", !inDetail && "line-clamp-2")}>
      {notification.message ?? "No message available"}
    </span>
  </div>
);

export const NotificationGrid = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  return (
    <div className="max-h-72 overflow-y-scroll rounded-md border no-scrollbar">
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
      <DialogContent className={cn("sm:max-w-[425px] rounded-md", className)}>
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="captalize w-max">
            All Notifications
          </DialogTitle>
          <ReadAllButton />
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-scroll rounded-md border no-scrollbar">
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
