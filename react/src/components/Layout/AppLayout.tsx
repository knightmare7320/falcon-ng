import { Outlet } from "react-router-dom";

import MenuBar from "./MenuBar";
import SideBar from "./SideBar";
import Content from "./Content";

export default function AppLayout() {
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