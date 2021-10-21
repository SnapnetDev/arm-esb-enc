import { useReducer } from "react";
import { CountReducer } from "../../reducers/CountReducer";

export function useCountAction() {
  const [count, dispatch] = useReducer(CountReducer, 0);

  return [count, dispatch];
}

// export const [count , dispatch] = useCountAction();
