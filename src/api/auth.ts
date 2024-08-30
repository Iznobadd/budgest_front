import { AuthResponse, LoginFormData, RegisterFormDataToSend } from "../types";
import axiosInstance from "../utils/axiosInstance";

export const registerUser = async (
  data: RegisterFormDataToSend
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("auth/register", data, {
      withCredentials: true,
    });
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
    const response = await axiosInstance.post("auth/login", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occured");
    } else {
      throw new Error("An unexpected error occured");
    }
  }
};
