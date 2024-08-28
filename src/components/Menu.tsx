import { IoMdAirplane } from "react-icons/io";
import { IoAccessibility, IoMagnet } from "react-icons/io5";
import { MenuItem } from "../types";

export const menu: MenuItem[] = [
  {
    name: "ADMIN",
    icon: <IoMdAirplane />,
    link: "",
    hasSub: false,
    head: true,
  },
  {
    name: "TEST 1",
    icon: <IoMagnet />,
    link: "",
    hasSub: false,
    head: false,
  },
  {
    name: "TEST 2",
    icon: <IoAccessibility />,
    link: "#",
    hasSub: true,
    head: false,
    sub: [
      {
        name: "Liste PRO",
        link: "",
      },
      {
        name: "Liste PART",
        link: "",
      },
    ],
  },
];
