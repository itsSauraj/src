"use client";

import type { RootState } from "@/redux/store";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import { SidebarProvider, useSidebar } from "./provider";

import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/components/dashboard/dropdown/noification";
import { BreadcrumbResponsive } from "@/components/breadcrumb";
// custom hook
import { useMediaQuery } from "@/hooks/use-media-query";

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider animate={animate} open={open} setOpen={setOpen}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();

  const sidebarPinned = useSelector(
    (state: RootState) => state.app.settings.sidebar,
  );

  useEffect(() => {
    setOpen(sidebarPinned);
  }, [sidebarPinned]);

  return (
    <>
      <motion.div
        animate={{
          width: animate ? (open ? "200px" : "60px") : "200px",
        }}
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col w-[200px] flex-shrink-0 bg-primary dark:bg-card",
          className,
        )}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => !sidebarPinned && setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [isMobile, pathname]);

  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex md:hidden items-center justify-between bg-primary dark:bg-card",
        )}
        {...props}
      >
        <div>
          <BreadcrumbResponsive />
        </div>
        <div className="flex z-20 items-center gap-2">
          <NotificationDropdown />
          <IconMenu2 className="text-white" onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className={cn(
                "fixed h-full w-full inset-0 bg-primary dark:bg-card p-10 z-[100] flex flex-col justify-between",
                className,
              )}
              exit={{ x: "-100%", opacity: 0 }}
              initial={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute right-10 top-10 z-50 text-white"
                role="button"
                tabIndex={0}
                onClick={() => setOpen(!open)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setOpen(!open);
                  }
                }}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
