import userLogo from "../assets/images/user2-160X160.jpg";
import logo from "../assets/images/AdminLTELogo.png";
const navIcon = "nav-icon fas fa-book";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="" className="brand-link">
        <img
          src={logo}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={userLogo}
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  <i className="right fas fa-angle-right"></i>
                </p>
              </NavLink>
            </li>
          </ul>

          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/credentials" className="nav-link">
                <i className={navIcon}></i>
                <p>
                  Credentials
                  <i className="right fas fa-angle-right"></i>
                </p>
              </NavLink>
            </li>
          </ul>

          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/apis" className="nav-link">
                <i className={navIcon}></i>
                <p>
                  APIs
                  <i className="right fas fa-angle-right"></i>
                </p>
              </NavLink>
            </li>
          </ul>

          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/stores" className="nav-link">
                <i className={navIcon}></i>
                <p>
                  Stores
                  <i className="right fas fa-angle-right"></i>
                </p>
              </NavLink>
            </li>
          </ul>

          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/apisync" className="nav-link">
                <i className={navIcon}></i>
                <p>
                  APISync
                  <i className="right fas fa-angle-right"></i>
                </p>
              </NavLink>
            </li>
          </ul>

          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="/storesync" className="nav-link">
                <i className={navIcon}></i>
                <p>
                  StoreSync
                  <i className="right fas fa-angle-right"></i>
                </p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
