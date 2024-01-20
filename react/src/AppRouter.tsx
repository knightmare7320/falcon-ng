import loadable from '@loadable/component';
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage";
import LoginPage, {action as authAction} from "./pages/LoginPage";
import {action as logoutAction} from "./pages/LogoutPage";
import { /*checkAuthLoader,*/ tokenLoader } from './util/auth.ts';
const BrowsePage = loadable(() => import('./pages/BrowsePage'));
const MapPage = loadable(() => import('./pages/MapPage'));
const SitePage = loadable(() => import('./pages/SitePage'));

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <BrowsePage type="national" />,
        // element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      { 
        path: "browse",
        // element: <BrowsePage />,
        // loader: checkAuthLoader,
        children: [
          {
            path: "",
            element: <BrowsePage type="national" />,
          }, 
          {
            path: "region/:id",
            element: <BrowsePage type="region" />,
          },
          {
            path: "l4_market/:id",
            element: <BrowsePage type="l4_market" />,
          },
          {
            path: "l5_market/:id",
            element: <BrowsePage type="l5_market" />,
          },
          {
            path: "cluster/:id",
            element: <BrowsePage type="cluster" />,
          },
          {
            path: "market99/:id",
            element: <BrowsePage type="market99" />,
          },
        ]
      },
      {
        path: "site/:cascade_code",
        element: <SitePage />,
      },
      { 
        path: "map",
        element: <MapPage />,
        // loader: checkAuthLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ],
  }
]);