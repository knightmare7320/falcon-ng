import { Link } from "react-router-dom";

import classes from "./MenuBar.module.css";

export default function MenuBar() {
  return (
    <header>
      <div className={classes.menuBar}>

        <div className={classes.title__icon}>
          <Link to="/">
            <img src="/K-favicon.webp" title="Falcon"></img>
          </Link>
        </div>
        <div className={classes.title__text}>
          Falcon
        </div>
        
        <div className={classes.menu}>
          <ul className={classes.menu__list}>
            <li className={classes.menu__listitem}>
              <Link to="/login" className={classes.menu__link}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}