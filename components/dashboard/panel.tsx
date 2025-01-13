"use clinet";

import React from "react";
import { BiDockLeft, BiSolidDockLeft } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import { BreadcrumbResponsive } from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbItem } from "@/types";
import { StoreDispatch } from "@/redux/store";
import { toogleSideBarPin } from "@/redux/slice/app";
import { ReduxStore } from "@/types/redux";
import { ProfileDropDown } from "@/components/dashboard/dropdown/profile";
import { NotificationDropdown } from "@/components/dashboard/dropdown/noification";

export const PagePanel = ({
  className,
  breadCrumb,
}: {
  className: string;
  breadCrumb: BreadcrumbItem[];
}) => {
  const sidebar = useSelector(
    (state: ReduxStore) => state.app.settings.sidebar,
  );
  const dispatch = useDispatch<StoreDispatch>();

  return (
    <div
      className={cn("w-full flex justify-between p-2 items-center", className)}
    >
      <div className="flex gap-2 items-center">
        {sidebar ? (
          <BiDockLeft
            className="text-2xl"
            onClick={() => dispatch(toogleSideBarPin())}
          />
        ) : (
          <BiSolidDockLeft
            className="text-2xl"
            onClick={() => dispatch(toogleSideBarPin())}
          />
        )}
        <Separator
          className="h-[25px] border-[1px] border-l-gray-600 dark:border-l-gray-300 flex-1"
          orientation="vertical"
        />
        <BreadcrumbResponsive items={breadCrumb} />
      </div>
      <div className="flex items-center gap-6">
        <NotificationDropdown />
        <ProfileDropDown />
      </div>
    </div>
  );
};
