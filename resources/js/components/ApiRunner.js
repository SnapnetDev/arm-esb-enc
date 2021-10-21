import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function ApiRunner(){

    const {state,dispatch} = useContext(AppContext);

    const id = state.json.id || 0;
 
    return (<>
    {id? (<div className="col-md-12" style={{marginTop:'11px'}}>
        <div>
           <button className="btn btn-sm btn-success form-control">Run API</button>
        </div>
        <div></div>
    </div>):''}
    </>);
    
}