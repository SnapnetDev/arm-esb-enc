import { AppContext } from "./AppContext";
import { useContext } from "react";
import { clearAuth } from "../reducers/AppReducer";
import { styleMargin } from "./layouts/Layout"; //../components/layouts/Layout
import { NavLink } from "react-router-dom";

const logoStyle = {
  fontWeight: "bold",
  fontFamily: "Font Awesome 5 Free",
  fontSize: "20px",
  color: "#eee",
};

const navItemStyle = {
  color: "#eee",
};

const navStyle = {
  backgroundColor: "#555",
  marginLeft: 0,
};

export default function NavMenu() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={navStyle}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" style={logoStyle} data-widget="pushmenu" href="#" role="button">
            {/* <i className="fas fa-bars"></i> */}
            SE
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/" className="nav-link" style={navItemStyle}>
            Home
          </NavLink>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/credentials" className="nav-link" style={navItemStyle}>
            Credentials
          </NavLink>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/categories" className="nav-link" style={navItemStyle}>
            Categories (Source Systems)
          </NavLink>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/apis" className="nav-link" style={navItemStyle}>
            APIs
          </NavLink>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/stores" className="nav-link" style={navItemStyle}>
            Stores
          </NavLink>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/entities" className="nav-link" style={navItemStyle}>
            Entities
          </NavLink>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/api-sync" className="nav-link" style={navItemStyle}>
            API - Sync
          </NavLink>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/store-sync" className="nav-link" style={navItemStyle}>
            Store - Sync
          </NavLink>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <NavLink to="/table-sync" className="nav-link" style={navItemStyle}>
            Table - Sync
          </NavLink>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item d-none d-sm-inline-block">
          <a href="" className="nav-link" style={navItemStyle}>
            Settings
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link" style={navItemStyle}>
            Profile
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link" style={navItemStyle}>
            Change Password
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" onClick={() => clearAuth({ dispatch, state })} className="nav-link" style={{ color: "red" }}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}
