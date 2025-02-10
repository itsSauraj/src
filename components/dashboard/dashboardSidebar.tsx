"use client";

import type { RootState } from "@/redux/store";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import { Logo, LogoIcon } from "@/components/ui/appLogo";
import {
  Sidebar as SidebarUI,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { links } from "@/lib/constants/dashboard";
import { PagePanel } from "@/components/dashboard/panel";
import { ProfileAvatar } from "@/components/dashboard/dropdown/profile";
//hooks
import { useMediaQuery } from "@/hooks/use-media-query";

export function SideBar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const userTypes: string[] = user.groups || [];
  const username: string = user.username || "";

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-primary dark:bg-card w-full flex-1 mx-auto \
        border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen w-screen",
      )}
    >
      <SidebarUI open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pt-1">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                if (
                  link.for &&
                  !link.for.some((forUser) => userTypes.includes(forUser))
                ) {
                  return null;
                }

                return (
                  <SidebarLink key={idx} className="text-white" link={link} />
                );
              })}
            </div>
          </div>
          <ProfileLink username={username} />
        </SidebarBody>
      </SidebarUI>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 ">
          <PagePanel className="hidden md:flex" />
          <div
            className="w-full h-full p-2 lg:p-4 border-neutral-200 dark:border-neutral-700 bg-white \
            dark:bg-card/60 rounded-tl-2xl flex-grow "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProfileLink = ({ username }: { username: string }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return !isDesktop ? (
    <Link href={"/profile"}>
      <ProfileAvatar username={username} />
    </Link>
  ) : null;
};
