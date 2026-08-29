import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav
      className={`navbar navbar-expand-lg shadow ${
      theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          Employee Management
        </Link>
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
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        > 
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/dashboard"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/employees"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/employees"
              >
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/add-employee"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/add-employee"
              >
                Add Employee
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            type="button"
            className="btn btn-danger ms-lg-3 mt-2 mt-lg-0"
            onClick={logout}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;