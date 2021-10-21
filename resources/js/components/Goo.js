import { useState, useReducer } from "react";
import { CountReducer, decAction, incAction } from "../reducers/CountReducer";
import { useCountAction } from "./actions/CountAction";

function Goo() {
  // const [count,setCount] = useState(0);
  const [count, dispatch] = useCountAction();

  return (
    <div>
      <button
        onClick={(e) => dispatch(incAction())}
        className="btn btn-sm btn-success"
      >
        Inc {count}
      </button>
      <button
        onClick={(e) => dispatch(decAction())}
        className="btn btn-sm btn-danger"
      >
        Dec {count}
      </button>
    </div>
  );
}

export default Goo;
