import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("trainer"); // clear trainer session
    navigate("/trainer/login"); // redirect to login
  };
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {/* Dashboard */}
        <li className="nav-item">
          <Link className="nav-link" to="/trainer/dashboard">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/trainer/calendar">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Calendar</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/trainer/attendance">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Attendance</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trainer/materials">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Course Materials</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trainer/works">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Allocated Works</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trainer/notifications">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Notifications</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trainer/materials">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Course Materials</span>
          </Link>
        </li>

        {/* Widgets */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/admin/widgets">
            <i className="icon-cog menu-icon"></i>
            <span className="menu-title">Widgets</span>
          </Link>
        </li> */}

        <li className="nav-item">
          <button
            className="nav-link"
            onClick={handleLogout}
            style={{
              border: "none",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <i className="icon-power menu-icon"></i>
            <span className="menu-title">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
