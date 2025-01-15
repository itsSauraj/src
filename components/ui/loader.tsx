import MoonLoader from 'react-spinners/MoonLoader';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <MoonLoader color="#2563EB" />
    </div>
  );
}
