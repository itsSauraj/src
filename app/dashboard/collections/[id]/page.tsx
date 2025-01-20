import type { UUID } from "crypto";

import ContentLoader from "@/components/dashboard/collections/loader";

const Page = async ({ params }: { params: Promise<{ id: UUID }> }) => {
  const collection_id = (await params).id;

  if (
    typeof collection_id !== "string" ||
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      collection_id,
    )
  ) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 h-full p-2">
      <ContentLoader id={collection_id} />
    </div>
  );
};

export default Page;
