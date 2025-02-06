import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      href="#"
    >
      <div className="h-5 w-6 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
        <Image alt="logo" height={25} src="/abra-icon.png" width={25} />
      </div>
      <motion.span
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
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
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
      href="#"
    >
      <div className="h-5 w-6 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
        <Image alt="logo" height={25} src="/abra-icon.png" width={25} />
      </div>
    </Link>
  );
};
