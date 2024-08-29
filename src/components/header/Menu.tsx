import { MenuItem } from "../../types";
import { MdAccountBalance } from "react-icons/md";
import { GrOverview } from "react-icons/gr";

export const menu: MenuItem[] = [
  {
    name: "GENERAL",
    link: "",
    hasSub: false,
    head: true,
  },
  {
    name: "Vue d'ensemble",
    icon: <GrOverview />,
    link: "/dashboard",
    hasSub: false,
    head: false,
  },
  {
    name: "Mes comptes",
    icon: <MdAccountBalance />,
    link: "/dashboard/account",
    hasSub: false,
    head: false,
  },
];
