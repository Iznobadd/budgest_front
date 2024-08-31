import axios from "axios";
import { AuthResponse, LoginFormData, RegisterFormDataToSend } from "../types";

export const registerUser = async (
  data: RegisterFormDataToSend
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL_API}auth/register`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occured");
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};

export const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_URL_API}auth/login`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occured");
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};
