// import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import LoginPage from "../../pages/LoginPage";
import MenuBar from "./MenuBar";
import SideBar from "./SideBar";
import Content from "./Content";

export default function RootLayout() {
  const showLoginState = useSelector((state: RootState) => state.auth.show_login);
  // const dispatch = useDispatch();
  // const notifications = useSelector((state) => state.ui.notifications);

  if (showLoginState) {
    return <>
      <MenuBar />
      <Content>
        <LoginPage />
      </Content>
    </>
  } else {
    return <>
      <MenuBar />
      <SideBar />
      <Content>
        {/* <Notifications /> */}
        <Outlet />
      </Content>
    </>;
  };
}