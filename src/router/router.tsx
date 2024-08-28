import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoute from "./PublicRoute";
import Private from "../pages/Private";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/private",
            element: <Private />,
          },
        ],
      },
    ],
  },
]);
