import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./SideBar.module.css";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverButton, setHoverButton] = useState('');

  function handleShowMenu() {
    setIsOpen(true);
  }
  function handleHideMenu() {
    setIsOpen(false);
    setHoverButton('');
  }
  let menuClass = classes.sidebarMenuBar
  if (isOpen) {
    menuClass += " " + classes.open;
  }

  function handleHover(name: string) {
    if (name !== hoverButton) {
      setHoverButton(name);
    }
  }

  // TODO: highlight icon and text together
  return (
    <nav onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
      <ul className={classes.sidebarMenu}>
        <li title="Browse the network">
          <NavLink 
            to="browse" 
            onMouseEnter={()=>handleHover("browse")} 
            className={`${classes.list} ${hoverButton === 'browse' && classes.sidebarMenubar__hover}`}
          >browse</NavLink>
        </li>
        <li title="Maps">
          <NavLink 
            to="map" 
            onMouseEnter={()=>handleHover("maps")} 
            className={`${classes.maps} ${hoverButton === 'maps' && classes.sidebarMenubar__hover}`}
          >maps</NavLink>
        </li>
        <li title="Reports">
          <NavLink 
            to="reports" 
            onMouseEnter={()=>handleHover("reports")} 
            className={`${classes.reports} ${hoverButton === 'reports' && classes.sidebarMenubar__hover}`}
          >reports</NavLink>
        </li>
        <li title="Admin">
          <NavLink 
            to="admin" 
            onMouseEnter={()=>handleHover("admin")} 
            className={`${classes.admin} ${hoverButton === 'admin' && classes.sidebarMenubar__hover}`}
          >admin</NavLink>
        </li>
        <li title="Search network elements">
          <NavLink 
            to="search" 
            onMouseEnter={()=>handleHover("search")} 
            className={`${classes.search} ${hoverButton === 'search' && classes.sidebarMenubar__hover}`}
          >search</NavLink>
        </li>
        <li title="User Settings">
          <NavLink 
            to="settings" 
            onMouseEnter={()=>handleHover("settings")} 
            className={`${classes.settings} ${hoverButton === 'settings' && classes.sidebarMenubar__hover}`}
          >user</NavLink>
        </li>
      </ul>
      
      <ul className={menuClass}>
        <li>
          <NavLink 
            to="browse" 
            onMouseEnter={()=>handleHover("browse")} 
            className={`${hoverButton === 'browse' && classes.sidebarMenubar__hover}`}
          >Browse</NavLink>
        </li>
        <li>
          <NavLink 
            to="map" 
            onMouseEnter={()=>handleHover("maps")}
            className={`${hoverButton === 'maps' && classes.sidebarMenubar__hover}`}
          >Maps</NavLink>
        </li>
        <li>
          <NavLink 
            to="reports" 
            onMouseEnter={()=>handleHover("reports")}
            className={`${hoverButton === 'reports' && classes.sidebarMenubar__hover}`}
          >Reports</NavLink>
        </li>
        <li>
          <NavLink 
            to="admin" 
            onMouseEnter={()=>handleHover("admin")}
            className={`${hoverButton === 'admin' && classes.sidebarMenubar__hover}`}
          >Admin</NavLink>
        </li>
        <li>
          <NavLink 
            to="search" 
            onMouseEnter={()=>handleHover("search")}
            className={`${hoverButton === 'search' && classes.sidebarMenubar__hover}`}
          >Search</NavLink>
        </li>
        <li>
          <NavLink 
            to="settings" 
            onMouseEnter={()=>handleHover("settings")}
            className={`${hoverButton === 'settings' && classes.sidebarMenubar__hover}`}
          >Settings</NavLink>
        </li>
      </ul>
    </nav>
  )
}