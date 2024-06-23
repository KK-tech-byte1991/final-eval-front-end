import {
  createBrowserRouter
} from "react-router-dom";

import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
import { AnalyticsLayout, DashboardLayout, SettingsLayout } from "./pages/dashboard/layout";
import Home from "./pages/home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />
  }
  , {
    path: "/settings",
    element: <SettingsLayout />
  },
  {
    path: "/analytics",
    element: <AnalyticsLayout />
  }

]) 