// Dummy content for dashboard
export const Dashboard = () => {
  return (
    <>
      <div className="flex gap-2">
        {[...new Array(4)].map((i, index) => (
          <div
            key={"first-array" + index}
            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
          />
        ))}
      </div>
      <div className="flex gap-2 flex-1">
        {[...new Array(2)].map((i, index) => (
          <div
            key={"second-array" + index}
            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
