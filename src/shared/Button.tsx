import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  label,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
      {...rest}
    >
      {children || label}
    </button>
  );
};

export default Button;
