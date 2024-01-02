import { Link } from "react-router-dom";

import classes from "./MenuBar.module.css";

export default function MenuBar() {
  return (
    <nav className={classes.menuBar}>
      <span>ICON Falcon</span>
      <span><Link to="/login">Login</Link></span>
    </nav>
  );
}