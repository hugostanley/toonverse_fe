import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import {
  LandingPage,
  OrderPage,
  UserAccountPage,
  UserLoginPage,
  UserRegisterPage,
} from "@pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },

    // User Side
    {
      path: "login",
      element: <UserLoginPage />,
    },
    {
      path: "register",
      element: <UserRegisterPage />,
    },
    {
      path: "account",
      element: <UserAccountPage />,
    },
    {
      path: "order",
      element: <OrderPage />,
    },
    // Workforce Side
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
