import { FieldError, UseFormRegister } from "react-hook-form";

export type InputType = "text" | "email" | "number" | "password" | "checkbox";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: InputType;
  name: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  label?: string;
  className?: string;
}
