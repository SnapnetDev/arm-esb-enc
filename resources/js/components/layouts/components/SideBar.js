import { AppContext } from "../../AppContext";
import { useContext } from "react";
import { clearAuth } from "../../../reducers/AppReducer";
import { styleMargin } from "../Layoutv2";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const { state, dispatch } = useContext(AppContext);
  return (
    // sidebar navigation paneld
    <nav className="hidden md:block w-60 mt-6">
      <div className="space-y-4 text-gun-metal-4 text-sm">
        <div>
          <NavLink to="/" className="pt-3 pb-3 block ml-10 visited:bg-green-700 hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-dashboard-2-line text-gun-metal-4"></i>
            </span>
            Home
          </NavLink>
        </div>
        <div className="">
          <NavLink to="/credentials" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className="align-middle mr-2 hover:text-french-violet-1">
              <i className="ri-lock-password-line text-gun-metal-4"></i>
            </span>
            Credentials
          </NavLink>
        </div>
        <div className="">
          <NavLink to="/categories" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-checkbox-multiple-line text-gun-metal-4"></i>
            </span>
            Categories
          </NavLink>
        </div>
        <div>
          <NavLink to="/apis" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-code-s-slash-line text-gun-metal-4"></i>
            </span>
            APIs
          </NavLink>
        </div>
        <div>
          <NavLink to="/stores" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-store-2-line text-gun-metal-4"></i>
            </span>
            Stores
          </NavLink>
        </div>
        <div>
          <NavLink to="/entities" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-brackets-line text-gun-metal-4"></i>
            </span>
            Entities
          </NavLink>
        </div>
        <div>
          <NavLink to="/api-sync" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-loader-4-fill text-gun-metal-4"></i>
            </span>
            API Sync
          </NavLink>
        </div>
        <div>
          <NavLink to="/store-sync" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className=" pt-3 pb-3 align-middle mr-2">
              <i className="ri-loader-3-fill text-gun-metal-4"></i>
            </span>
            Store Sync
          </NavLink>
        </div>
        <div>
          <NavLink to="/table-sync" className=" pt-3 pb-3 block ml-10 hover:text-french-violet-1">
            <span className="align-middle mr-2">
              <i className="ri-table-line text-gun-metal-4"></i>
            </span>
            Table Sync
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
