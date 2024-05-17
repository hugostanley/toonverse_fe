import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css';

import { LandingPage, UserAccountPage, UserLoginPage, UserRegisterPage, WorkforceDashboard, WorkforceLoginPage } from '@pages';
import { userAccess } from '@utils';

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
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
      element: <UserAccountPage />,
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
    },
  ]);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

export default App

