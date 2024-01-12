import { Link } from "react-router-dom";

import "./MenuBar.css";

export default function MenuBar() {
  return (
    <header className="menuBar">
      <div className="menuBar__icon">
        <Link to="/">
          <img src="/K-favicon.webp" title="Falcon"></img>
        </Link>
      </div>
      <div className="menuBar__title">
        Falcon
      </div>
      
      <nav className="menuBar__menu">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}