import { useState, useEffect } from "react";
import Login from "./Login";
// import logo from "../assets/images/";

export default function IntelLogin() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 1000);
  }, []);

  return (
    <>
      {!visible ? (
        <div className=" w-full h-screen flex justify-center items-center gap-x-8 bg-gray-100">
          <img className=" animation__shake" src="/images/jikooo-image.png" alt="AdminLTELogo" height="150" width="150" />
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-4 border-french-violet-1"></div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
