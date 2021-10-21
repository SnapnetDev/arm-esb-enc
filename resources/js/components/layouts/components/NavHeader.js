import { AppContext } from "../../AppContext";
import { useContext } from "react";
import { useState } from "react";
import { clearAuth } from "../../../reducers/AppReducer";
import { styleMargin } from "../Layoutv2";
import { NavLink } from "react-router-dom";

export default function NavHeader() {
  const { state, dispatch } = useContext(AppContext);
  const [isMenuClicked, setMenuToggle] = useState(false);

  const menuClicked = () => {
    setMenuToggle(!isMenuClicked);
  };

  return (
    <header className="sticky bg-white top-0 mx-auto w-full max-h-32 px-2 py-2 md:px-6 md:py-6">
      <div className="flex justify-between p-2 md:flex flex-row items-center md:px-2 md:py-2 md:space-x-4">
        {/* <!-- logo for large screens --> */}
        <div className="hidden w-64 md:block">
          {/* <h1 className="font-bold lg:text-lg xl:text-2xl text-french-violet-1">Snapnet ESB</h1> */}
          <img className=" w-32" src="/images/jikooo-image.png" />
        </div>
        {/* <!-- logo mobile & tablet view --> */}
        <div className=" md:hidden">
          <h1 className="text-md font-bold text-french-violet-1">Snapnet ESB</h1>
        </div>

        {/* <!-- hamburger menu icon for mobile--> */}

        <div className=" md:hidden">
          {isMenuClicked ? (
            <a href="#" className="text-sm align-middle hover:text-french-violet-1" onClick={menuClicked}>
              <i className="ri-close-line text-gray-800 text-base hover:text-french-violet-1 text-center align-middle"></i> Close
            </a>
          ) : (
            <a href="#" className="text-sm align-middle hover:text-french-violet-1" onClick={menuClicked}>
              <i className="ri-menu-3-line text-gray-800 text-base hover:text-french-violet-1 text-center align-middle"></i> Menu
            </a>
          )}
        </div>

        {/* <!-- search bar and icons --> */}
        <div className="hidden flex-1 md:block md:w-full">
          <div className="md:flex flex-row">
            {/* <!-- search bar --> */}
            <div className="md:w-2/3 ">
              <div className="flex p-1 border rounded-md border-gray-200 max-w-md max-h-10">
                <button>
                  <span className="flex justify-end items-center text-grey mr-2 ml-2">
                    <i className="ri-search-line text-french-violet-1 md:text-lg"></i>
                  </span>
                </button>
                <input className=" border-0 outline-none text-xs" type="search" name="search" id="" placeholder="Search.." />
              </div>
            </div>

            {/* <!-- utility icons --> */}
            <div className="hidden md:w-1/3 md:flex justify-center space-x-10 flex-grow-0 items-center text-gray-800">
              {/* <!-- settings --> */}
              <div>
                <NavLink to="#" className="hover:text-french-violet-1">
                  {" "}
                  <i className="ri-settings-5-line lg:text-2xl md:text-lg"></i>
                </NavLink>
              </div>
              {/* <!-- profile --> */}
              <div>
                <NavLink to="#" className="hover:text-french-violet-1">
                  <i className="ri-account-circle-line lg:text-2xl md:text-lg"></i>
                </NavLink>
              </div>
              {/* Change Company Profile */}
              <div>
                <NavLink to="#" className="hover:text-french-violet-1">
                  <i className="ri-profile-line lg:text-2xl md:text-lg"></i>
                </NavLink>
              </div>

              {/* <!-- logout --> */}
              <div>
                <a href="#" onClick={() => clearAuth({ dispatch, state })}>
                  <i className="ri-logout-box-r-line lg:text-2xl md:text-lg hover:text-red-300 text-red-500"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- mobile Navigation menu drop down --> */}
      <div
        style={isMenuClicked ? { display: "" } : { display: "none" }}
        className=" md:hidden flex bg-gray-200 justify-between px-3 py-4 text-xs text-gun-metal-4"
      >
        <div className="space-y-4">
          <NavLink to="/" className="block hover:text-french-violet-1 text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-dashboard-2-line text-french-violet-1"></i>
            </span>
            Home
          </NavLink>
          <NavLink to="/credentials" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2 hover:text-french-violet-1">
              <i className="ri-lock-password-line text-french-violet-1"></i>
            </span>
            Credentials
          </NavLink>
          <NavLink to="/categories" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-checkbox-multiple-line text-french-violet-1"></i>
            </span>
            Categories
          </NavLink>
          <NavLink to="/apis" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-code-s-slash-line text-french-violet-1"></i>
            </span>
            APIs
          </NavLink>
          <NavLink to="/stores" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-store-2-line text-french-violet-1"></i>
            </span>
            Stores
          </NavLink>
        </div>
        <div className="space-y-4">
          <NavLink to="/entities" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-brackets-line text-french-violet-1"></i>
            </span>
            Entities
          </NavLink>
          <NavLink to="/api-sync" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-loader-4-fill text-french-violet-1"></i>
            </span>
            API Sync
          </NavLink>
          <NavLink to="/store-sync" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-loader-3-fill text-french-violet-1"></i>
            </span>
            Store Sync
          </NavLink>
          <NavLink to="/table-sync" className="block hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-table-line text-french-violet-1"></i>
            </span>
            Table Sync
          </NavLink>
        </div>
        {/* <!-- mobile drop down utility links --> */}
        <div>
          <div className="flex justify-between items-center space-x-3 align-middle text-gray-800">
            {/* <!-- settings --> */}
            <div>
              <a href="" className="hover:text-french-violet-1">
                <i className="ri-settings-5-line text-sm"></i>
              </a>
            </div>
            {/* <!-- profile --> */}
            <div>
              <a href="" className="hover:text-french-violet-1">
                <i className="ri-account-circle-line text-sm"></i>
              </a>
            </div>

            {/* <!-- logout --> */}
            <div>
              <a href="" className="hover:text-french-violet-1">
                <i className="ri-logout-box-r-line text-sm text-red-500"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
