"use client";

import type { StoreDispatch } from "@/redux/store";

import * as React from "react";
import { useDispatch } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NotiicationBell,
  NotificationGrid,
} from "@/components/dashboard/dropdown/notificationBell";
import { Button } from "@/components/ui/button";

export const NotificationDropdown = ({ className }: { className?: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch<StoreDispatch>();
  // const notification = useSelector(
  //   (state: RootState) => state.app.notifications,
  // );

  const [notification, setnotification] = React.useState<
    Array<Record<string, string | number>>
  >([]);

  const notify = notification.length > 0 ? true : false;

  React.useEffect(() => {
    const noti = [
      {
        id: 1,
        title: "New message from John Doe",
        message: "Hey, how are you doing?",
        date: "2022-01-01",
      },
      {
        id: 5,
        title: "New message from Jane Doe",
        message:
          "Hey, how are you doing? Hey, \
        how are you doing?Hey, how are you doing?Hey, \
        how are you doing?Hey, how are you doing?Hey, \
        how are you doing?Hey, how are you doing?Hey, \
        how are you doing?Hey, how are you doing?",
        date: "2022-01-01",
      },
      {
        id: 2,
        title: "New message from Jane Doe",
        message: "Hey, how are you doing?",
        date: "2022-01-01",
      },
      {
        id: 3,
        title: "New message from Jane Doe",
        message: "Hey, how are you doing?",
        date: "2022-01-01",
      },
      {
        id: 4,
        title: "New message from Jane Doe",
        message: "Hey, how are you doing?",
        date: "2022-01-01",
      },
    ];

    setnotification(noti);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <NotiicationBell className={className} notify={notify} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        {notify ? (
          <>
            <NotificationGrid notifications={notification} />
            <Button className="w-full mt-2">Show all</Button>
          </>
        ) : (
          <div className="p-4">No new notifications</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
