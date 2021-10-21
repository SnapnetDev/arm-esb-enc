import React, { useReducer, useMemo } from "react";
import ReactDOM from "react-dom";
import Goo from "./components/Goo";
import Foo from "./components/Foo";
import Login from "./components/Login";
import { HashRouter } from "react-router-dom";
import { AppContext } from "./components/AppContext";
import RouteManager from "./router/RouteManager";
import AppReducer, { initialState } from "./reducers/AppReducer";
import MessageLogger from "./components/MessageLogger";
import AuthSession from "./components/AuthSession";
import jQuery from "jquery";
// import main from "./assets/css/main.css";

function Main() {
  const [state1, dispatch1] = useReducer(AppReducer, initialState);
  const [state, dispatch] = useMemo(() => [state1, dispatch1], [state1]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AuthSession />
      <HashRouter>
        <RouteManager />
      </HashRouter>
    </AppContext.Provider>
  );
}

export default Main;

if (document.getElementById("root")) {
  ReactDOM.render(<Main />, document.getElementById("root"));
}
