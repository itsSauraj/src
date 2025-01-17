import { MdSpaceDashboard } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";

export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <MdSpaceDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    for: ["admin", "mentor", "trainee"],
  },
  {
    label: "Mentors",
    href: "/dashboard/mentors",
    icon: (
      <FaPeopleRoof className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    for: ["admin"],
  },
  {
    label: "Courses",
    href: "/dashboard/courses",
    icon: (
      <IoBookSharp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    for: ["admin", "trainee"],
  },
  {
    label: "Trainees",
    href: "/dashboard/trainees",
    icon: (
      <PiStudentFill className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    for: ["admin", "mentor"],
  },
];
