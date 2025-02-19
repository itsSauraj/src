import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  UserProfileUpdate,
  ChangePassword,
} from "@/components/dashboard/profile";

const UserProfilePage = () => {
  return (
    <ScrollArea className="h-[90svh] lg:h-[85svh] relative">
      <div className="flex flex-col lg:flex-row gap-5 h-full">
        <UserProfileUpdate />
        <ChangePassword />
      </div>
    </ScrollArea>
  );
};

export default UserProfilePage;
