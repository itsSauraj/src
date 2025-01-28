import * as React from "react";
import { IoIosNotifications } from "react-icons/io";
import { X } from "lucide-react";

//Components
import { Button } from "@/components/ui/button";
//utils
import { cn } from "@/lib/utils";

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
  notifications: Array<Record<string, string | number>>;
}) {
  return (
    <div className="max-h-72 overflow-y-scroll rounded-md border no-scrollbar">
      {notifications.slice(0, 3).map((notification) => (
        <div
          key={notification.id}
          className="p-2 hover:bg-neutral-300 border-b-1 relative"
        >
          <Button
            className="px-1 h-6 absolute top-1 right-1 hover:text-red-500"
            variant="link"
          >
            <X />
          </Button>
          <h3 className="text-sm font-semibold">{notification.title}</h3>
          <span className="text-[10px] line-clamp-2">
            {notification.message}
          </span>
        </div>
      ))}
    </div>
  );
}
