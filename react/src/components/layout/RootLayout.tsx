// import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";

import MenuBar from "../ui/MenuBar";
import SideBar from "../ui/SideBar";
import Content from "./Content";

export default function RootLayout() {
  // const dispatch = useDispatch();
  // const notifications = useSelector((state) => state.ui.notifications);

  return (
    <>
      <MenuBar />
      <SideBar />
        <Content>
          <Outlet />
        </Content>
    </>
  );
}