"use client";
import type { ReduxStore } from "@/types/redux";

import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/components/dashboard/dropdown/noification";
import { BreadcrumbResponsive } from "@/components/breadcrumb";

interface Links {
  label: string;
  href?: string;
  icon?: React.JSX.Element | React.ReactNode;
  child?: React.JSX.Element;
  type?: string;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

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
    (state: ReduxStore) => state.app.settings.sidebar,
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
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[200px] flex-shrink-0",
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

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800",
        )}
        {...props}
      >
        <div>
          <BreadcrumbResponsive />
        </div>
        <div className="flex z-20 items-center gap-2">
          <NotificationDropdown className="text-xl" />
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
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
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
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

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: () => void;
  props?: LinkProps;
}) => {
  return (
    <>
      {link.child ? (
        link.child
      ) : (
        <>
          {link.type === "button" ? (
            <button
              className={cn(
                "flex items-center justify-start gap-2  group/sidebar py-2",
                className,
              )}
              onClick={onClick}
            >
              <LinkContent link={link} />
            </button>
          ) : (
            <Link
              className={cn(
                "flex items-center justify-start gap-2  group/sidebar py-2",
                className,
              )}
              href={link.href || "#"}
              {...props}
            >
              <LinkContent link={link} />
            </Link>
          )}
        </>
      )}
    </>
  );
};

export const LinkContent = ({ link }: { link: Links }) => {
  const { open, animate } = useSidebar();

  return (
    <>
      <span className={`${link.href === "/logout" && "text-red-500"}`}>
        {link.icon}
      </span>

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        <span
          className={`${link.label.toLowerCase() === "logout" && "text-red-500"}`}
        >
          {link.label}
        </span>
      </motion.span>
    </>
  );
};
