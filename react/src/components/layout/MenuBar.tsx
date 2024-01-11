import { Link } from "react-router-dom";

import classes from "./MenuBar.module.css";

export default function MenuBar() {
  return (
    <header>
      <div className={classes.menuBar}>

        <div className={classes.title}>
          <Link to="/">
            <img src="/K-favicon.webp" title="Falcon"></img>
          </Link>
          <p>Falcon</p>
        </div>

        <ul className={classes.menu}>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </header>
  );
}