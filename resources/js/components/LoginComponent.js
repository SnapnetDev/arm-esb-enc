import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function LoginComponent({label}){
 
    const {state,dispatch} = useContext(AppContext);
    const {loggedIn} = state;

    return (<div className="login-page" style={{display:loggedIn? 'none':'inline-block'}}>
    <div className="login-box">
    <div className="login-logo">
      <a href="">{label}</a>
      {/* <b>SNAP</b>ESB */}
    </div>
    
    <div className="card">
      <div className="card-body login-card-body">
        <p className="login-box-msg">Sign in to start your session {loggedIn? 'Logged - In':'Logged-Out'}</p>
  
        <form action="" method="post">
          <InputText type="email" label="E-mail" field="email" />
          <InputText type="password" label="Password" field="password" />
                              
          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">
                  Remember Me
                </label>
              </div>
            </div>


            

            <StoreUpdateButton apiStore="login" apiUpdate="Update" textStore="Login" textUpdate="" afterLoad={(res)=>{console.log(res);} } />
                        
          </div>
        </form>
  
          
      </div>
      
    </div>
  </div>
  </div>);

}