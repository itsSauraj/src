"use clinet";

import type { StoreDispatch, RootState } from "@/redux/store";

import React from "react";
import { BiDockLeft, BiSolidDockLeft } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import { BreadcrumbResponsive } from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { toogleSideBarPin } from "@/redux/slice/app";
import { ProfileDropDown } from "@/components/dashboard/dropdown/profile";
import { NotificationDropdown } from "@/components/dashboard/dropdown/noification";

export const PagePanel = ({ className }: { className: string }) => {
  const sidebar = useSelector((state: RootState) => state.app.settings.sidebar);
  const dispatch = useDispatch<StoreDispatch>();

  return (
    <div
      className={cn("w-full flex justify-between p-2 items-center", className)}
    >
      <div className="gap-2 items-center hidden md:flex">
        <button
          className="rounded-lg hover:bg-gray-700/10 hover:dark:bg-gray-300/10 transition-[background-color] duration-300 ease p-2"
          onClick={() => dispatch(toogleSideBarPin())}
        >
          {sidebar ? (
            <BiDockLeft className="text-2xl cursor-pointer text-white" />
          ) : (
            <BiSolidDockLeft className="text-2xl cursor-pointer text-white" />
          )}
        </button>
        <Separator
          className="h-[25px] border-[1px] border-l-gray-600 dark:border-l-gray-300 flex-1 hidden md:flex"
          orientation="vertical"
        />
        <BreadcrumbResponsive />
      </div>
      <div className="flex items-center gap-6">
        <NotificationDropdown />
        <ProfileDropDown />
      </div>
    </div>
  );
};
