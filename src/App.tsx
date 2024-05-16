import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { LandingPage, UserLoginPage } from '@pages';

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

    // Workforce Side
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App

