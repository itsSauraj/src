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
import { CreateToolTipT } from "@/components/collection/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser } from "@/redux/slice/user";
import { ThemeSwitch } from "@/components/theme-switch";

export function ProfileDropDown() {
  const dispatch = useDispatch<StoreDispatch>();
  const username = useSelector((state: RootState) => state.user.user?.username);
  const userAvatar = useSelector((state: RootState) => state.user.user?.avatar);
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
      <CreateToolTipT
        content="My Account"
        trigger={
          <DropdownMenuTrigger>
            <ProfileAvatar avatar={userAvatar} username={username} />
          </DropdownMenuTrigger>
        }
      />
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

export function ProfileAvatar({
  avatar,
  username,
}: {
  avatar?: string;
  username?: string;
}) {
  return (
    <Avatar>
      {avatar && (
        <AvatarImage
          alt={username}
          src={(process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") + avatar}
        />
      )}
      <AvatarFallback className="uppercase">
        {username ? username.slice(0, 2) : "AB"}
      </AvatarFallback>
    </Avatar>
  );
}
