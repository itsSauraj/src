"use client";

import type { RootState } from "@/redux/store";
import type { NotificationState } from "@/types/redux";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  NotiicationBell,
  NotificationGrid,
  AllNotificationDialog,
} from "./notificationComponents";

//components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const NotificationDropdown = ({ className }: { className?: string }) => {
  const notificationObj: NotificationState = useSelector(
    (state: RootState) => state.app.notifications,
  );
  const [dropDownnOpen, setDropDownnOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const notify = notificationObj.unreadCount > 0 ? true : false;

  useEffect(() => {
    if (notify) {
      document.title = `(${notificationObj.unreadCount}) Notification`;
    } else {
      document.title = "Dashboard";
    }
  }, [notificationObj]);

  return (
    <>
      <DropdownMenu open={dropDownnOpen} onOpenChange={setDropDownnOpen}>
        <DropdownMenuTrigger>
          <NotiicationBell
            className={className}
            count={notificationObj.unreadCount}
            notify={notify}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          {notify ? (
            <>
              <NotificationGrid notifications={notificationObj.items} />
              <Button
                className="w-full mt-2"
                onClick={() => {
                  setDropDownnOpen(false);
                  setOpen(true);
                }}
              >
                Show all
              </Button>
            </>
          ) : (
            <div className="p-4">No new notifications</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AllNotificationDialog
        notifications={notificationObj.items}
        setState={setOpen}
        state={open}
      />
    </>
  );
};
