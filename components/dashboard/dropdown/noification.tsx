"use client";

import type { ReduxStore } from "@/types/redux";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StoreDispatch } from "@/redux/store";
import {
  NotiicationBell,
  NotificationGrid,
} from "@/components/dashboard/dropdown/notificationBell";

export const NotificationDropdown = ({ className }: { className?: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch<StoreDispatch>();
  const notification = useSelector(
    (state: ReduxStore) => state.app.notifications,
  );

  const notify = notification.length > 0 ? true : false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <NotiicationBell className={className} notify={notify} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {notify ? (
          <NotificationGrid notifications={notification} />
        ) : (
          <div className="p-4">No new notifications</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
