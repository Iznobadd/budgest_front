import React from "react";
import { PageWrapperProps } from "../types";
import { Link } from "react-router-dom";

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  actions,
  children,
}) => {
  return (
    <>
      <div className="border-b border-b-gray-200 shadow-sm h-16 flex items-center justify-between py-4 px-6">
        <h1 className="text-neutral-dark font-bold">{title}</h1>
        <div className="flex gap-3">
          {actions &&
            actions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="border border-gray-200 p-2 rounded-lg shadow-sm"
              >
                {action.icon && action.icon}
                {action.label}
              </Link>
            ))}
        </div>
      </div>
      <div className="relative p-6 bg-gray-100 min-h-[calc(100vh-128px)]">
        {children}
      </div>
    </>
  );
};

export default PageWrapper;
