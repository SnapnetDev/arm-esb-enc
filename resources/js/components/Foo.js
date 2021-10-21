import { useState, useReducer } from "react";
import { CountReducer } from "../reducers/CountReducer";
import { useCountAction } from "./actions/CountAction";

export default function Foo() {
  const [count, dispatch] = useCountAction();

  return <div>Tracking counnt as : {count}</div>;
}
