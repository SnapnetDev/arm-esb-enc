import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { setLoggedIn } from "../reducers/AppReducer";

export default function AuthSession() {
  const { state, dispatch } = useContext(AppContext);
  const { token } = state;

  useEffect(() => {
    const esbToken = localStorage.getItem("esb_token");
    if (esbToken) {
      setLoggedIn({ dispatch, state, value: true });
      return;
    }
    setLoggedIn({ dispatch, state, value: false });
  }, [token]);

  return "";
}
