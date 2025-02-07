"use client";

import MoonLoader from "react-spinners/MoonLoader";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <MoonLoader color="#6e6f72" />
    </div>
  );
}

export const IconLoader = () => (
  <div className="flex flex-col justify-center items-center h-screen w-full bg-primary p-3">
    <Image
      alt="loader"
      height={80}
      loading="lazy"
      src="/abra-icon.png"
      width={80}
    />
    <h3 className="text-white font-bold text-2xl">ABRA</h3>
  </div>
);
