import type { UUID } from "crypto";

import React from "react";

import UserProfile from "@/components/dashboard/userProfile";
import TraineeActivity from "@/components/dashboard/traineeActivity";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = async ({ params }: { params: Promise<{ id: UUID }> }) => {
  const trainee_id = (await params).id;

  return (
    <div className="h-full w-full">
      <div className="container mx-auto p-2">
        <ScrollArea className="h-[100svh]">
          <div className="flex flex-row gap-2 justify-center items-center h-full w-full">
            {/* left Card */}
            <UserProfile className="lg:w-1/4" memberId={trainee_id} />
            {/* right Card */}
            <TraineeActivity className="flex-grow" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
