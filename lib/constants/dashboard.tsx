import { MdSpaceDashboard } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";
import { PiExamFill } from "react-icons/pi";

export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <MdSpaceDashboard className="text-white h-5 w-5 flex-shrink-0" />,
    for: ["admin", "mentor", "trainee"],
  },
  {
    label: "Mentors",
    href: "/dashboard/mentors",
    icon: <FaPeopleRoof className="text-white h-5 w-5 flex-shrink-0" />,
    for: ["admin"],
  },
  {
    label: "Courses",
    href: "/dashboard/courses",
    icon: <IoBookSharp className="text-white h-5 w-5 flex-shrink-0" />,
    for: ["admin", "trainee"],
  },
  {
    label: "Collections",
    href: "/dashboard/collections",
    icon: <SiBookstack className="text-white h-5 w-5 flex-shrink-0" />,
    for: ["admin"],
  },
  {
    label: "Trainees",
    href: "/dashboard/trainees",
    icon: <PiStudentFill className="text-white h-5 w-5 flex-shrink-0" />,
    for: ["admin", "mentor"],
  },
  {
    label: "Exams",
    href: "/dashboard/exam",
    icon: <PiExamFill className="text-white h-5 w-5 flex-shrink-0" />,
    for: ["admin", "mentor", "trainee"],
  },
];
