import { RouterProvider } from "react-router-dom";

import { appRouter } from "./App-router";

export default function App() {
  return <RouterProvider router={appRouter} />;
}
