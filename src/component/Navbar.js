import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ setToken }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token"); // remove token
    alert("Logged out successfully!"); // optional
    setToken(localStorage.removeItem("token"));
    navigate('/');
  }

  useEffect(() => {
    // Highlight the active link based on current path
    const activeLink = document.querySelectorAll(".nav-link");
    activeLink.forEach((link) => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          Notiva
        </Link>

        {/* Toggler for small screens */}
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

        {/* Links + Buttons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left side nav */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          {/* Right side buttons */}
          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-warning" onClick={handleClick}>
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
