import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      className="flex space-x-2 items- text-sm text-black py-1 relative z-20"
      href="/"
    >
      <Image alt="logo" height={25} src="/abra-icon.png" width={25} />
      <motion.span
        animate={{ opacity: 1 }}
        className="text-white whitespace-pre uppercase text-xl font-extrabold h-[25px]"
        initial={{ opacity: 0 }}
      >
        Abra
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      className="font-normal flex space-x-2 text-sm text-black py-1 relative z-20"
      href="#"
    >
      <Image alt="logo" height={25} src="/abra-icon.png" width={25} />
    </Link>
  );
};
