"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateBreadcrumbs } from "@/lib/utils";

const ITEMS_TO_DISPLAY = 3;

export function BreadcrumbResponsive() {
  const pathname = usePathname();
  const items = generateBreadcrumbs(pathname);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const renderCollapsedItems = () => {
    if (items.length <= ITEMS_TO_DISPLAY) return null;

    return (
      <>
        <BreadcrumbItem>
          {isDesktop ? (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                aria-label="Toggle menu"
                className="flex items-center gap-1"
              >
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {items.slice(1, -2).map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link href={item.href ? item.href : "#"}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger aria-label="Toggle Menu">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Navigate to</DrawerTitle>
                  <DrawerDescription>
                    Select a page to navigate to.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="grid gap-1 px-4">
                  {items.slice(1, -2).map((item, index) => (
                    <Link
                      key={index}
                      className="py-1 text-sm"
                      href={item.href ? item.href : "#"}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <DrawerFooter className="pt-4">
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </>
    );
  };

  const renderVisibleItems = () => {
    return items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index, array) => (
      <React.Fragment key={index}>
        <BreadcrumbItem>
          {item.href ? (
            <BreadcrumbLink
              asChild
              className="max-w-20 truncate md:max-w-none text-white hover:text-white hover:opacity-70"
            >
              <Link href={item.href}>{item.label}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage className="max-w-20 truncate md:max-w-none text-white hover:text-white hover:opacity-70">
              {item.label}
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {index < array.length - 1 && <BreadcrumbSeparator />}
      </React.Fragment>
    ));
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {renderCollapsedItems()}
        {renderVisibleItems()}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
