import { Account } from "../types";
import axiosInstance from "../utils/axiosInstance";

export const fetchAccounts = async (): Promise<Account[]> => {
  const response = await axiosInstance.get("accounts", {
    withCredentials: true,
  });
  return response.data;
};
