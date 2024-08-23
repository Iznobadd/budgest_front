import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IAuthContext } from "../types";
import isTokenExpired from "../utils/isTokenExpired";
import axios from "axios";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        if (!isTokenExpired(token)) {
          setIsAuthenticated(true);
        } else {
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_URL_API}auth/refresh`,
              {},
              { withCredentials: true }
            );

            const newAccessToken = response.data.access_token;
            localStorage.setItem("access_token", newAccessToken);
            setIsAuthenticated(true);
          } catch (error) {
            localStorage.removeItem("access_token");
            setIsAuthenticated(false);
          }
        }
      } else {
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
