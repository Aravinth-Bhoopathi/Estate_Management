import React from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import {
  BsHouseDoor,
  BsReverseLayoutTextWindowReverse,
  BsBoxArrowLeft,
} from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import "../css/sidebar.css";

const Sidebar = (props) => {
  const logout = () => {
    cookie.remove("token");
    window.location.reload();
  };

  const handleHamburger = () => {
    if (document.body.classList.contains("full_side_bar")) {
      document.body.classList.add("small_side_bar");
      document.body.classList.remove("full_side_bar");
    } else {
      document.body.classList.add("full_side_bar");
      document.body.classList.remove("small_side_bar");
    }
  };

  return (
    <div>
      <div className="full_side_bar_content">
        <div className="sidebar_container">
          <GiHamburgerMenu
            className="sidebar_hamburger"
            onClick={handleHamburger}
          />
          <h3 className="sidebar_header">Sidebar</h3>
        </div>
        <div className="sidebar_container">
          <BsHouseDoor className="sidebar-logo" />
          <Link className="sidebar_link" to="/dashboard">
            Dashboard
          </Link>
        </div>
        <div className="sidebar_container">
          <BsReverseLayoutTextWindowReverse className="sidebar-logo" />
          <Link className="sidebar_link" to="/properties">
            My Properties
          </Link>
        </div>
        <div className="sidebar_container">
          <BsBoxArrowLeft className="sidebar-logo" />
          <Link className="sidebar_link" to="/login" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>

      <div className="small_side_bar_content">
        <div className="sidebar_container">
          <GiHamburgerMenu
            className="sidebar_hamburger"
            onClick={handleHamburger}
          />
        </div>
        <div className="sidebar_container">
          <Link className="sidebar_link" to="/dashboard">
            <BsHouseDoor to="/dashboard" className="sidebar-logo" />
          </Link>
        </div>
        <div className="sidebar_container">
          <Link className="sidebar_link" to="/properties">
            <BsReverseLayoutTextWindowReverse className="sidebar-logo" />
          </Link>
        </div>
        <div className="sidebar_container">
          <Link className="sidebar_link" to="/login" onClick={logout}>
            <BsBoxArrowLeft className="sidebar-logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
