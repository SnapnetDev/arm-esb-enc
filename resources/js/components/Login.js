import { AuthButton, InputText, StoreUpdateButton } from "./input-components/Input";
import { AppContext } from "./AppContext";
import { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { LInputPassword, LInputText, TAuthButton, TButton, TinputText } from "./input-components/InputV2";
import WhiteLogo from "./svg/WhiteLogo";
import SideLoginImage from "./svg/SideLoginImage";

export default function Login({ defaultEmail }) {
  const { state, dispatch } = useContext(AppContext);
  //  const {loggedIn} = state;
  // useEffect(()=>{},[]);

  const loggedIn = state.loggedIn || false;

  return (
    <>
      {loggedIn ? (
        <Dashboard />
      ) : (
        <div className="login-page">
          <div className={`${loggedIn ? "hidden" : "flex"}`}>
            <div className=" flex flex-col flex-1 h-screen bg-french-violet-1 w-1/2 pl-14 pr-8 pb-6 pt-6">
              {/* <img className=" w-32 bg-white" src="/images/jikooo-image.png" /> */}
              <WhiteLogo width={"200"} heigth={"76"} />
              {/* Login Form  */}
              <div className=" w- flex flex-col flex-1 justify-center">
                <div className=" w-3/5 bg-white pl-8 pr-8 pb-8 pt-8 self-center rounded-md ">
                  <form action="" method="post">
                    <div className=" space-y-6">
                      <LInputText label={"Email"} store="auth" type="email" />
                      <LInputPassword type="password" label={"Password"} store="auth" />
                      <label className=" text-1xs text-gray-400">Your passowrd should be atleast 8 characters</label>
                      <p> </p>
                      <TAuthButton text={"Login"} type="button" width={true} store="auth" />
                      {/* <TButton text={"Login"} width={true} store="auth" /> */}
                      <div className=" flex items-center justify-center space-x-2 mt-2">
                        <span className="h-px bg-gray-200 flex-1"></span>
                        <span className="font-normal text-gray-400 text-xs">Powered By</span>
                        <span className="h-px bg-gray-200 flex-1"></span>
                      </div>

                      <div className="flex justify-center">
                        <img className=" w-40 h-12" src="/images/logo.png" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className=" bg-white flex flex-col flex-1 h-screen px-8 justify-center">
              <SideLoginImage width={"640"} height={"418"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
