import React, { useState } from "react";
import Image from "next/image";

import { Logo, LogoIcon } from "@/components/ui/appLogo";
import {
  Sidebar as SidebarUI,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { links } from "@/lib/constants/dashboard";
import { PagePanel } from "@/components/dashboard/panel";

export function SideBar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen w-screen",
      )}
    >
      <SidebarUI open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pt-4">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                return <SidebarLink key={idx} link={link} />;
              })}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    alt="Avatar"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    height={50}
                    src="https://assets.aceternity.com/manu.png"
                    width={50}
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </SidebarUI>
      <div className="flex flex-1 py-3">
        <div className="flex flex-col flex-1 ">
          <PagePanel className="rounded-tl-2xl hidden md:flex" />
          <div className="w-full h-full p-4 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-tl-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
