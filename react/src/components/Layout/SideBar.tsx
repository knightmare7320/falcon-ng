import { useState } from "react";

import "./SideBar.css";

// $(".menu-button").click(function(){
//   $(".menu-bar").toggleClass( "open" );
//   })

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleMenu() {
    setIsOpen(prevValue => !prevValue);
  }
  function handleShowMenu() {
    setIsOpen(true);
  }
  function handleHideMenu() {
    setIsOpen(false);
  }
  let menuClass = "sidebar-menu-bar"
  if (isOpen) {
    menuClass += " open";
  }

  // TODO: highlight icon and text together
  return (
    <header>
      <nav onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
        <ul className="sidebar-menu">
          <li title="list"><a href="#" className="list">browse</a></li>
          <li title="maps"><a href="#" className="maps">maps</a></li>
          <li title="reports"><a href="#" className="reports">reports</a></li>
          <li title="search"><a href="#" className="search">search</a></li>
          <li title="user"><a href="#" className="settings">user</a></li>
        </ul>
        
        <ul className={menuClass}>
          <li><a href="#">Browse</a></li>
          <li><a href="#">Maps</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Search</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
    </header>
  )
}