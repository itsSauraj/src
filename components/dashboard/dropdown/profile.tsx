"use client";

import type { StoreDispatch, RootState } from "@/redux/store";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser } from "@/redux/slice/user";

export function ProfileDropDown() {
  const dispatch = useDispatch<StoreDispatch>();
  const username = useSelector((state: RootState) => state.user.user?.username);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleClick = (clicked: string) => {
    switch (clicked) {
      case "profile":
        router.push("/dashboard/profile");
        break;
      case "settings":
        router.push("/dashboard/settings");
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar username={username} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleClick("profile")}>
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>
          <ThemeSwitch />
        </DropdownMenuItem> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="text-red-500 hover:text-red-500"
          onClick={handleLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileAvatar({ username }: { username?: string }) {
  return (
    <Avatar>
      {/* <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" /> */}
      <AvatarFallback className="uppercase">
        {username ? username.slice(0, 2) : "AB"}
      </AvatarFallback>
    </Avatar>
  );
}
