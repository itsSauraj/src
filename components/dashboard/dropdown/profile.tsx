import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoreDispatch } from "@/redux/store";
import { logoutUser } from "@/redux/slice/user";
import { ReduxStore } from "@/types/redux";
import { ThemeSwitch } from "@/components/theme-switch";

export function ProfileDropDown() {
  const dispatch = useDispatch<StoreDispatch>();
  const token = useSelector((state: ReduxStore) => state.user.token);

  const handleLogout = () => {
    dispatch(logoutUser(token));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ThemeSwitch />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileAvatar() {
  return (
    <Avatar>
      <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
