import { RemainingBudgetResponse } from "../types";
import axiosInstance from "../utils/axiosInstance";

export const remainingBudget = async (): Promise<RemainingBudgetResponse> => {
  try {
    const response = await axiosInstance.get(`budgets/remaining`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Could not fetch the remaining budget");
  }
};
