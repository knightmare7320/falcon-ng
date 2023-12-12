import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./SideBar.module.css";

// $(".menu-button").click(function(){
//   $(".menu-bar").toggleClass( "open" );
//   })

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleShowMenu() {
    setIsOpen(true);
  }
  function handleHideMenu() {
    setIsOpen(false);
  }
  let menuClass = classes.sidebarMenuBar
  if (isOpen) {
    menuClass += " " + classes.open;
  }

  // TODO: highlight icon and text together
  return (
    <header>
      <nav onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
        <ul className={classes.sidebarMenu}>
          <li title="list">
            <NavLink to="browse" className={classes.list}>browse</NavLink>
          </li>
          <li title="maps">
            <NavLink to="maps" className={classes.maps}>maps</NavLink>
          </li>
          <li title="reports">
            <NavLink to="reports" className={classes.reports}>reports</NavLink>
          </li>
          <li title="search">
            <NavLink to="search" className={classes.search}>search</NavLink>
          </li>
          <li title="user">
            <NavLink to="settings" className={classes.settings}>user</NavLink>
          </li>
        </ul>
        
        <ul className={menuClass}>
          <li>
            <NavLink to="browse">Browse</NavLink>
          </li>
          <li>
            <NavLink to="maps">Maps</NavLink>
          </li>
          <li>
            <NavLink to="reports">Reports</NavLink>
          </li>
          <li>
            <NavLink to="search">Search</NavLink>
          </li>
          <li>
            <NavLink to="settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}