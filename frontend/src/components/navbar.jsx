import React from "react";
import { isLoggedIn } from "./../services/auth";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
          {!isLoggedIn() && (
              <a className="navbar-brand" href="/login">
              Capstone Product
            </a>
            )}
            {isLoggedIn() && (
              <a className="navbar-brand" href="/home">
              Capstone Product
            </a>
            )}
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!isLoggedIn() && (
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/login">
                  Login
                </a>
              </li>
            )}
            {isLoggedIn() && (
              <React.Fragment>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="/balanceinquiry"
                  >
                    Balance Inquiry
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/fundtransfer">
                    Fund Transfer
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/ministatement">
                    Mini Statement
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/logout">
                    Logout
                  </a>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
