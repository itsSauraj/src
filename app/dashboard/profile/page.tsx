import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  UserProfileUpdate,
  ChangePassword,
} from "@/components/dashboard/profile";

const UserProfilePage = () => {
  return (
    <ScrollArea className="h-[80svh] lg:h-[85svh] sm:p-2">
      <div className="flex flex-col lg:flex-row h-[80svh] gap-5">
        <UserProfileUpdate />
        <ChangePassword />
      </div>
    </ScrollArea>
  );
};

export default UserProfilePage;
