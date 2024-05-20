import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css';

import { userAccess, workforceAccess } from '@utils';
import { UserAccountLayout } from '@layouts';
import {
  EditProfilePage,
  LandingPage,
  OrderFormTest,
  OrderPage,
  UnauthorizedPage, 
  UserAccountPage,
  UserLoginPage,
  UserRegisterPage, 
  WorkforceDashboard, 
  WorkforceLoginPage,
} from '@pages';

function App() {
  const queryClient = new QueryClient();
  const googleClient = '134846806156-5tqvcr9itkt4hm7erkb0pq2jos6jsbdb.apps.googleusercontent.com';
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/no-access',
      element: <UnauthorizedPage />,
    },

    // User Side
    {
      path: 'login',
      element: <UserLoginPage />,
    },
    {
      path: 'register',
      element: <UserRegisterPage />,
    },
    {
      path: 'account',
      element: <UserAccountLayout />,
      loader: userAccess,
      children: [
        {
          index: true,
          element: <UserAccountPage />,
        },
        {
          path: 'edit',
          element: <EditProfilePage />,
        },
      ],
    },
    {

      path: 'order',
      element: <OrderPage />,
      loader: userAccess,
    },   
    {
      path: "testpage",
      element: <OrderFormTest />,
      loader: userAccess,
    },

    // Workforce Side
    {
      path: 'w/login',
      element: <WorkforceLoginPage />,
    },
    {
      path: 'w/dashboard',
      element: <WorkforceDashboard />,
      loader: workforceAccess,
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
  )
}

export default App