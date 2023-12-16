import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";

import MenuBar from "./MenuBar";
import SideBar from "./SideBar";
import Content from "./Content";

export default function AppLayout() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.ui.notifications);

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