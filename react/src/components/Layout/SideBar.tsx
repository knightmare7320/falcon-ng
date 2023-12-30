import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./SideBar.module.css";

// $(".menu-button").click(function(){
//   $(".menu-bar").toggleClass( "open" );
//   })

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
    <header>
      <nav onMouseEnter={handleShowMenu} onMouseLeave={handleHideMenu}>
        <ul className={classes.sidebarMenu}>
          <li title="list">
            <NavLink 
              to="browse" 
              onMouseEnter={()=>handleHover("browse")} 
              className={`${classes.list} ${hoverButton === 'browse' && classes.sidebarMenubar__Hover}`}
            >browse</NavLink>
          </li>
          <li title="maps">
            <NavLink 
              to="map" 
              onMouseEnter={()=>handleHover("maps")} 
              className={`${classes.maps} ${hoverButton === 'maps' && classes.sidebarMenubar__Hover}`}
            >maps</NavLink>
          </li>
          <li title="reports">
            <NavLink 
              to="reports" 
              onMouseEnter={()=>handleHover("reports")} 
              className={`${classes.reports} ${hoverButton === 'reports' && classes.sidebarMenubar__Hover}`}
            >reports</NavLink>
          </li>
          <li title="search">
            <NavLink 
              to="search" 
              onMouseEnter={()=>handleHover("search")} 
              className={`${classes.search} ${hoverButton === 'search' && classes.sidebarMenubar__Hover}`}
            >search</NavLink>
          </li>
          <li title="user">
            <NavLink 
              to="settings" 
              onMouseEnter={()=>handleHover("settings")} 
              className={`${classes.settings} ${hoverButton === 'settings' && classes.sidebarMenubar__Hover}`}
            >user</NavLink>
          </li>
        </ul>
        
        <ul className={menuClass}>
          <li>
            <NavLink 
              to="browse" 
              onMouseEnter={()=>handleHover("browse")} 
              className={`${hoverButton === 'browse' && classes.sidebarMenubar__Hover}`}
            >Browse</NavLink>
          </li>
          <li>
            <NavLink 
              to="map" 
              onMouseEnter={()=>handleHover("maps")}
              className={`${hoverButton === 'maps' && classes.sidebarMenubar__Hover}`}
            >Maps</NavLink>
          </li>
          <li>
            <NavLink 
              to="reports" 
              onMouseEnter={()=>handleHover("reports")}
              className={`${hoverButton === 'reports' && classes.sidebarMenubar__Hover}`}
            >Reports</NavLink>
          </li>
          <li>
            <NavLink 
              to="search" 
              onMouseEnter={()=>handleHover("search")}
              className={`${hoverButton === 'search' && classes.sidebarMenubar__Hover}`}
            >Search</NavLink>
          </li>
          <li>
            <NavLink 
              to="settings" 
              onMouseEnter={()=>handleHover("settings")}
              className={`${hoverButton === 'settings' && classes.sidebarMenubar__Hover}`}
            >Settings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}