import MoonLoader from "react-spinners/MoonLoader";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <MoonLoader color="#6e6f72" />
    </div>
  );
}
