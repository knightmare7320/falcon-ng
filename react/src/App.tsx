import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { AppRouter } from "./AppRouter";
import { uiActions } from "./store/ui.slice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiActions.fetchRegions());
    dispatch(uiActions.fetchL4Markets());
    dispatch(uiActions.fetchL5Markets());
    dispatch(uiActions.fetchClusters());
  }, []);

  return (
    <RouterProvider router={AppRouter} />
  );
}