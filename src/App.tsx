import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

import { adminAccess, artistAccess, userAccess } from "@utils";
import { AdminLayout, ArtistLayout, UserAccountLayout } from "@layouts";
import {
  AdminDashboard,
  AllArtistsPage,
  ArtistDashboard,
  EditProfilePage,
  InvitationPage,
  Checkout,
  LandingPage,
  OrderPage,
  UnauthorizedPage,
  UserAccountPage,
  UserLoginPage,
  UserRegisterPage,
  WorkforceLoginPage,
  AllClientsPage,
  AllOrdersPage,
  ArtistJobsTable,
} from "@pages";

function App() {
  const queryClient = new QueryClient();
  const googleClient =
    "134846806156-5tqvcr9itkt4hm7erkb0pq2jos6jsbdb.apps.googleusercontent.com"; // WIP: feat/oauth
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "no-access",
      element: <UnauthorizedPage />,
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
      element: <UserAccountLayout />,
      loader: userAccess,
      children: [
        {
          index: true,
          element: <UserAccountPage />,
        },
        {
          path: "edit",
          element: <EditProfilePage />,
        },
      ],
    },
    {
      path: "order/:params",
      element: <OrderPage />,
      loader: userAccess,
    },
    {
      path: "checkout",
      element: <Checkout />,
      loader: userAccess,
    },

    // Workforce Side
    {
      path: "w/login",
      element: <WorkforceLoginPage />,
    },
    {
      path: "w/invitation/accept",
      element: <InvitationPage />,
    },
    {
      path: "admin",
      element: <AdminLayout />,
      loader: adminAccess,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "artists",
          element: <AllArtistsPage />,
        },
        {
          path: "clients",
          element: <AllClientsPage />,
        },
        {
          path: "orders",
          element: <AllOrdersPage />,
        },
      ],
    },

    {
      path: "w",
      element: <ArtistLayout />,
      loader: artistAccess,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" />,
        },
        {
          path: "dashboard",
          element: <ArtistDashboard />,
        },
        {
          path: "jobs",
          element: <ArtistJobsTable />,
        },
      ],
    },
    
    
  ]);

  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
}

export default App;
