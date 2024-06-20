import {
  createBrowserRouter
} from "react-router-dom";

import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
import Dashboard from "./pages/dashboard/dashboard";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1 >Welcome</h1>,
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
    path:"/dashboard",
    element:<Dashboard/>
  }
]);