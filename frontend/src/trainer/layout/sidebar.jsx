import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {/* Dashboard */}
        <li className="nav-item">
          <Link className="nav-link" to="/admin/course">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Course</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="subcourse/index">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Sub-Course</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="topic/index">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Topic</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="subtopic/index">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Subtopic</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="student/index">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Student</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="trainer/index">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Trainer</span>
          </Link>
        </li>

        {/* Widgets */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/admin/widgets">
            <i className="icon-cog menu-icon"></i>
            <span className="menu-title">Widgets</span>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
