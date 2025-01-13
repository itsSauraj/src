import { Table } from "@/components/ui/AgCustomTable";
import { AddDialog } from "@/components/collection/modal";
import { AddMentor } from "@/components/dashboard/forms";
//lib/api.ts
import { fetchMentors } from "@/lib/api";

export const Dashboard = async () => {
  
  const mentors = await fetchMentors();
  console.log(mentors);

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
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
