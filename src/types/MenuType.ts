import { ReactNode } from "react";

export interface SubMenu {
  name: string;
  link: string;
}

export interface MenuItem {
  name: string;
  icon?: ReactNode;
  link: string;
  hasSub: boolean;
  head: boolean;
  sub?: SubMenu[];
}

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
