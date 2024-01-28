import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import classes from "./Content.module.css";
import LoginPage from "../../pages/LoginPage";

export default function Content({children}: {children: ReactNode}) {

  const showLoginState = useSelector((state: RootState) => state.auth.show_login);

  return <>
    <div className={classes.pageContent}>
      { showLoginState ? <LoginPage /> : children }
    </div>
  </>;
}