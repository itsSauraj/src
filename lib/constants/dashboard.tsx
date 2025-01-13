import { IconArrowLeft } from "@tabler/icons-react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

import { ThemeSwitch } from "@/components/theme-switch";

export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <MdSpaceDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Mentors",
    href: "/dashboard/mentors",
    icon: (
      <FaPeopleRoof className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Trainees",
    href: "/dashboard/trainees",
    icon: (
      <PiStudentFill className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    child: <ThemeSwitch />,
    label: "Change Theme",
  },
  {
    label: "Logout",
    type: "button",
    icon: <IconArrowLeft className="text-red-500 h-5 w-5 flex-shrink-0" />,
  },
];
