import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/languages"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                LANGUAGES
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/countires"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                COUNTRIES
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/explore"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                EXPLORE
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/endangered"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                ENDANGERED
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        
      </nav>
    </>
  );
}

export default NavBar;