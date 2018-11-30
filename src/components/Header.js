import React from "react";

const Header = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="float-left">
          <img src="/globe1a.png" alt="logo" />
          <a href="/" className="navbar-brand align-middle">
            {props.title}
          </a>
        </div>
        <div className="float-right">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Weather
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
