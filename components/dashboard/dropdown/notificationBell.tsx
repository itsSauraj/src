import type { RootState } from "@/redux/store";

import * as React from "react";
import { IoIosNotifications } from "react-icons/io";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const NotiicationBell = ({
  className,
  notify,
}: {
  className?: string;
  notify: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center relative p-1 rounded-full hover:bg-gray-700/10 hover:dark:bg-gray-300/10 transition-[background-color] duration-300 ease text-3xl",
        className,
      )}
    >
      <IoIosNotifications />
      {notify && (
        <span className="absolute top-0 right-[3px] text-5xl bg-blue-600 rounded-full w-[10px] h-[10px]" />
      )}
    </div>
  );
};

export function NotificationGrid({
  notifications,
}: {
  notifications: RootState["app"]["notifications"];
}) {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {notifications.map((notification) => (
          <>
            {notification.message}
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
