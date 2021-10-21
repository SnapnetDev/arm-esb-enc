import { toSafeInteger } from "lodash";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { setMessage } from "../reducers/AppReducer";

export default function MessageLogger({ message, error }) {
  //    const {state , dispatch} = useContext(AppContext);
  //    const {message,error} = state;
  useEffect(() => {
    if (message) {
      if (error) {
        toastr.error(message);
        return;
      }
      toastr.success(message);
      //  setMessage({dispatch,state,error:false,message:''});
    }
  }, [message, error]);

  return "";
}
