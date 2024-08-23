import { useContext } from "react";
import { IAuthContext } from "../types";
import { AuthContext } from "../context/AuthContext";

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
