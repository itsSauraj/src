import React from "react";

import { CollectionCard } from "@/components/dashboard/course/client/collectionCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const client = () => {
  return (
    <ScrollArea className="absolute h-[90svh]">
      <div className="max-h-full flex justify-start items-center gap-4 p-4 flex-wrap">
        <CollectionCard />
      </div>
    </ScrollArea>
  );
};

export default client;
