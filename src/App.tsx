import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

import { adminAccess, artistAccess, userAccess } from "@utils";
import { AdminLayout, UserAccountLayout } from "@layouts";
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
} from "@pages";

function App() {
  const queryClient = new QueryClient();
  const googleClient = '134846806156-5tqvcr9itkt4hm7erkb0pq2jos6jsbdb.apps.googleusercontent.com'; // WIP: feat/oauth
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
      path: "login", // Add leading slash
      element: <UserLoginPage />,
    },
    {
      path: "register", // Add leading slash
      element: <UserRegisterPage />,
    },
    {
      path: "account", // Add leading slash
      element: <UserAccountLayout />,
      loader: userAccess,
      children: [
        {
          index: true,
          element: <UserAccountPage />,
        },
        {
          path: "edit", // Add leading slash
          element: <EditProfilePage />,
        },
      ],
    },
    {
      path: "order/:params", // Add leading slash
      element: <OrderPage />,
      loader: userAccess,
    },
    {
      path: "checkout", // Add leading slash
      element: <Checkout />,
    },
  
    // Workforce Side
    {
      path: "w/login", // Add leading slash
      element: <WorkforceLoginPage />,
    },
    {
      path: "w/invitation/accept", // Add leading slash
      element: <InvitationPage />,
    },
    {
      path: "admin", // Add leading slash
      element: <AdminLayout />,
      loader: adminAccess,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "artists", // Add leading slash
          element: <AllArtistsPage />,
        },
      ],
    },
    {
      path: "w/dashboard", // Add leading slash
      element: <ArtistDashboard />,
      loader: artistAccess,
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
