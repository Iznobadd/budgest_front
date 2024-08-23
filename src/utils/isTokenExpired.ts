import { jwtDecode } from "jwt-decode";
import { JwtToken } from "../types";

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(`CurrentTime = ${currentTime}`);
    console.log(`Expiration = ${decoded.exp}`);

    return decoded.exp < currentTime;
  } catch (error: any) {
    return true;
  }
};

export default isTokenExpired;
