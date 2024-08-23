import { z } from "zod";

export interface IAuthContext {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface JwtToken {
  exp: number;
  iat: number;
  sub: string;
}

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterFormDataToSend = Omit<RegisterFormData, "confirmPassword">;

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password is too short" })
      .max(60, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password is too short" })
    .max(60, { message: "Password is too long" }),
});

export type AuthResponse = {
  access_token: string;
};
