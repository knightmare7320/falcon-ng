import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/auth.slice";
import { RootState } from "../../store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./MenuBar.css";

export default function MenuBar() {
  const dispatch = useDispatch();
  const authState = useSelector((state:RootState) => state.auth);

  function handleLogin() {
    dispatch(authActions.showLogin());
  }

  function handleLogout() {
    dispatch(authActions.setLogout());
  }

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
            { authState.status !== 'ok' ? 
              <button className="loginButton" onClick={handleLogin}>Login</button> :
              <button className="loginButton" onClick={handleLogout} title={`Logged in as ${authState.full_name}`}>Logout</button>
            }
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