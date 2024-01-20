import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./MenuBar.css";

export default function MenuBar() {
  return (
    <header className="menuBar">
      <div className="menuBar__icon">
        <Link to="/">
          <img src="/K-favicon.webp" title="brian.k.knight@gmail.com"></img>
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
          <li>
            <form className="search-box">
              <button>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input type="search" placeholder="Search..." autoComplete="off"/>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}