import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage.tsx";
import {action as logoutAction} from "./pages/LogoutPage";
import { checkAuthLoader, tokenLoader } from './util/auth.ts';

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      { 
        path: "browse",
        element: <BrowsePage />,
        // loader: checkAuthLoader,
      },
      { 
        path: "map",
        element: <MapPage />,
        // loader: checkAuthLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ],
  }
]);