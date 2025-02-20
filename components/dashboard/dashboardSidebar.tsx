"use client";

import type { RootState } from "@/redux/store";

import React, { useState } from "react";
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
import { CreateToolTipT } from "@/components/collection/tooltip";
//hooks

export function SideBar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const userTypes: string[] = (user && user.groups) || [];
  const username: string = (user && user.username) || "";
  const userAvatar: string = (user && user.avatar) || "";

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-primary w-full flex-1 mx-auto \
        border border-neutral-200 dark:border-neutral-700 overflow-hidden dark:bg-accent",
        "h-screen w-screen",
      )}
    >
      <SidebarUI open={open} setOpen={setOpen}>
        <SidebarBody className="dark:bg-accent p-0">
          <div className="flex flex-col h-full justify-between py-2">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden px-5 py-3">
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
            <div className="px-2">
              <CreateToolTipT
                content="My profile"
                trigger={
                  <Link
                    className="flex items-center border-2 rounded-full w-max p-[1px]"
                    href={"/dashboard/profile"}
                  >
                    {open ? (
                      <div
                        className="bg-white flex items-center gap-2 border-2 rounded-full w-max
                      hover:opacity-85
                    "
                      >
                        <ProfileAvatar
                          avatar={userAvatar}
                          username={username}
                        />
                        <span className="pr-2">
                          {user && user.first_name} {user && user.last_name}
                        </span>
                      </div>
                    ) : (
                      <ProfileAvatar avatar={userAvatar} username={username} />
                    )}
                  </Link>
                }
              />
            </div>
          </div>
        </SidebarBody>
      </SidebarUI>
      <div className="flex flex-1">
        <div className="flex flex-col flex-1">
          <PagePanel className="hidden md:flex" />
          <div
            className="w-full h-full p-2 lg:p-4 border-neutral-200 dark:border-neutral-700 bg-white \
            rounded-tl-2xl flex-grow dark:bg-card"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
