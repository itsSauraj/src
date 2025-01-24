import type { UUID } from "crypto";

import React from "react";

import UserReport from "@/components/dashboard/userReport";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = async ({ params }: { params: Promise<{ id: UUID }> }) => {
  const trainee_id = (await params).id;

  return (
    <div className="h-full w-full p-2">
      <ScrollArea className="h-full w-full">
        <div className="absolute flex flex-col md:flex-row gap-4 h-full w-full overflow-scroll">
          <UserReport trainee_id={trainee_id} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Page;
