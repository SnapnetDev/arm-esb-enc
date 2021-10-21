import { Route } from "react-router-dom";
import Login from "../components/Login";
import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import IntelLogin from "../components/IntelLogin";
import Credentials from "../pages/Credentials";
import CredentialsV2 from "../pages/CredentialsV2";
import CategoriesV2 from "../pages/CategoriesV2";
import ApisV2 from "../pages/ApisV2";
import StoresV2 from "../pages/StoresV2";
import EntityModelV2 from "../pages/EntityModelV2";
import ApiSyncV2 from "../pages/ApiSyncV2";
import StoreSyncV2 from "../pages/StoreSyncV2";
import TableSyncV2 from "../pages/TableSyncV2";
import Apis from "../pages/Apis";
import Stores from "../pages/Stores";
import EntityModel from "../pages/EntityModel";
import ApiSync from "../pages/ApiSync";
import StoreSync from "../pages/StoreSync";
import Categories from "../pages/Categories";
import TableSync from "../pages/TableSync";
import EntityTable from "../pages/EntityTable";

export default function RouteManager() {
  const { state, dispatch } = useContext(AppContext);
  const { loggedIn } = state;
  return (
    <>
      <Route component={IntelLogin} path="/" exact={true} />
      <Route component={CredentialsV2} path="/credentials" />
      <Route component={CategoriesV2} path="/categories" />
      <Route component={ApisV2} path="/apis" />
      <Route component={StoresV2} path="/stores" />
      <Route component={EntityModelV2} path="/entities" />
      <Route component={ApiSyncV2} path="/api-sync" />
      <Route component={StoreSyncV2} path="/store-sync" />
      <Route component={TableSyncV2} path="/table-sync" />
      <Route component={EntityTable} path="/entity/:id/:name" />
    </>
  );
}
