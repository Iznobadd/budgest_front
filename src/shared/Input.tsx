import React from "react";
import { InputProps } from "../types";

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  name,
  register,
  error,
  className,
  ...props
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber: type === "number" })}
        className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          error ? "border-red-600" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </>
  );
};

export default Input;
