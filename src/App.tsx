import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { LandingPage, UserAccountPage, UserLoginPage, UserRegisterPage } from '@pages';
import { userAccess } from '@utils';

function App() {
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
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App

