import loadable from '@loadable/component';
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
// import { checkAuthLoader } from './util/auth.service.ts';
const BrowsePage = loadable(() => import('./pages/BrowsePage'));
const MapPage = loadable(() => import('./pages/MapPage'));
const SitePage = loadable(() => import('./pages/SitePage'));
import ReportsPage from './pages/ReportsPage/index.tsx';
import SearchPage from './pages/SearchPage/index.tsx';
import SettingsPage from './pages/SettingsPage/index.tsx';
import AdminPage from './pages/AdminPage/index.tsx';

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BrowsePage type="national" />,
        // element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      { 
        path: "browse",
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
            path: "l4Market/:id",
            element: <BrowsePage type="l4Market" />,
          },
          {
            path: "l5Market/:id",
            element: <BrowsePage type="l5Market" />,
          },
          {
            path: "orgCluster/:id",
            element: <BrowsePage type="orgCluster" />,
          },
        ]
      },
      {
        path: "site/:cascadeCode/:tabName?",
        element: <SitePage />,
      },
      { 
        path: "map",
        element: <MapPage />,
      },
      { 
        path: "search",
        element: <SearchPage />,
      },
      { 
        path: "reports",
        element: <ReportsPage />,
      },
      { 
        path: "settings",
        element: <SettingsPage />,
        // loader: checkAuthLoader,
      },
      { 
        path: "admin",
        element: <AdminPage />,
        // loader: checkAuthLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  }
]);