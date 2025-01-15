// componets
import RenderTable from "../../../components/dashboard/renderTable";

import { AddDialog } from "@/components/collection/modal";
import { AddMentor } from "@/components/dashboard/forms";

export const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="flex justify-end">
        <AddDialog
          description="Add a new mentor to your training group"
          title="Add Mentor"
        >
          <AddMentor />
        </AddDialog>
      </div>
      <div className="flex flex-col w-full h-full">
        <RenderTable type="mentor" />
      </div>
    </div>
  );
};

export default Dashboard;
