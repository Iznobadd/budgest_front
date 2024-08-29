import { PropsWithChildren, ReactNode } from "react";

export interface PageAction {
  link: string;
  label: string;
  icon?: ReactNode;
}

export interface PageWrapperProps extends PropsWithChildren {
  title: string;
  actions?: PageAction[];
}
