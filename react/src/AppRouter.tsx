import { lazy, Suspense } from 'react'
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./components/layout/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
// import { checkAuthLoader } from './util/auth.service.ts';
const BrowsePage = lazy(() => import('./pages/BrowsePage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const SitePage = lazy(() => import('./pages/SitePage'));
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
            element: <Suspense fallback={<div>Loading...</div>}><BrowsePage type="national" /></Suspense>,
          }, 
          {
            path: "region/:id",
            element: <Suspense fallback={<div>Loading...</div>}><BrowsePage type="region" /></Suspense>,
          },
          {
            path: "l4Market/:id",
            element: <Suspense fallback={<div>Loading...</div>}><BrowsePage type="l4Market" /></Suspense>,
          },
          {
            path: "l5Market/:id",
            element: <Suspense fallback={<div>Loading...</div>}><BrowsePage type="l5Market" /></Suspense>,
          },
          {
            path: "orgCluster/:id",
            element: <Suspense fallback={<div>Loading...</div>}><BrowsePage type="orgCluster" /></Suspense>,
          },
        ]
      },
      {
        path: "site/:cascadeCode/:tabName?",
        element: <Suspense fallback={<div>Loading...</div>}><SitePage /></Suspense>,
      },
      { 
        path: "map",
        element: <Suspense fallback={<div>Loading...</div>}><MapPage /></Suspense>,
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