import { Transactions } from "../types";
import axiosInstance from "../utils/axiosInstance";

export const lastTransactions = async (): Promise<Transactions> => {
  try {
    const response = await axiosInstance.get("transactions/last", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error("Could not fetch the last transactions");
  }
};
