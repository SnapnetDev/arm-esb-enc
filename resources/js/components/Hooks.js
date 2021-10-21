import { param } from "jquery";
import { useEffect, useState } from "react";
import { API_PATH } from "./Config";

export const useFetch = ({url,options})=>{
    const [response,setResponse] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isMounted,setIsMounted] = useState(true);
    // let isMounted = true;
    useEffect(()=>{
        setLoading(true);
        fetch(API_PATH + url,options).then(res=>res.json()).then(res=>{
          setResponse(res);
          setLoading(false);
        }).catch(error=>setError(error)).finally(()=>{
          //  
          setLoading(false);
        });          
        return ()=>setIsMounted(false);
    },[url]);
    return {response,errorResponse:error,loading}; 
};


export const useGet =({url})=>{
    const {response , errorResponse , loading} = useFetch({url,options:{
        method:'GET'
    }});
    return {response,errorResponse,error:errorResponse};
};

export const doGet =({url,setLoading,setResponse})=>{
    setLoading(true);
    return fetch(`${API_PATH}${url}`,{
        method:"GET"
    }).then(res=>res.json()).then((response)=>{
      setLoading(false);
      setResponse(response);
    });
};


export const doPost =({url,formData,setLoading,setMessage,setError})=>{
    setLoading(true);
    return fetch(`${API_PATH}${url}`,{
        method:"POST",
        body:formData
    }).then(res=>res.json()).then(({message,error,data})=>{
      setLoading(false);
      setMessage(message);
      setMessage('');
      setError(error);
      return new Promise((r)=>r());
    });
};

export const doPut =({url,formData,setLoading,setMessage,setError})=>{
    setLoading(true);
    formData.append('_method','PUT');
    return fetch(`${API_PATH}${url}`,{
        method:"POST",
        body:formData
    }).then(res=>res.json()).then(({message,error,data})=>{
      setLoading(false);
      setMessage(message);
      setMessage('');
      setError(error);
      return new Promise((r)=>r());
    });
};

export const doRemove =({url,formData,setLoading,setMessage,setError})=>{
    setLoading(true);
    formData.append('_method','DELETE');
    return fetch(`${API_PATH}${url}`,{
        method:"POST",
        body:formData
    }).then(res=>res.json()).then(({message,error,data})=>{
      setLoading(false);
      setMessage(message);
      setMessage('');
      setError(error);
      return new Promise((r)=>r());
    });
};


function EntryText({data,updateData,...attr}){
    const {field,label,type} = {...attr};
    // const [state,setState] = useState('');
    const value = data[field] || '';

    // useEffect(()=>{
    //     updateData({field,value:state});
    // },[state]);

    return (<div className="form-group">
    <label>{label}</label>
    <input type={type} className="form-control" onChange={(e)=>updateData({field,value:e.target.value})} value={value} placeholder={label} />
  </div>);             
}

function EntrySelect({...attr}){
    // console.log({...attr});
    const {field,label,valueField,idField,data,updateData,defaultId,defaultValue,list} = {...attr};
    const value = data[field] || '';
    return (<div className="form-group">
    <label>{label}</label>
    <select  className="form-control" value={value} onChange={(e)=>updateData({field,value:e.target.value})} placeholder={label}>
      <option value={defaultId}>{defaultValue}</option>
      {list.map((item,key)=><option key={key} value={item[idField]}>{item[valueField]}</option>)}
    </select>
  </div>);
}

function EntrySelectTrigger({...attr}){
    // console.log({...attr});
    const {field,label,valueField,idField,list,onChange,reload,defaultId,defaultValue} = {...attr};
    // const value = data[field] || '';
    return (<div className="form-group">
    <label>{label}</label>
    <select className="form-control"  onChange={(e)=>onChange({value:e.target.value})} placeholder={label}>
      <option value={defaultId}>{defaultValue}</option>
      {list.map((item,key)=><option key={key} value={item[idField]}>{item[valueField]}</option>)}
    </select>
  </div>);
}


function EntryTextArea({data,updateData,...attr}){
    const {field,label,type} = {...attr};
    const value = data[field] || '';
    return (<div className="form-group">
    <label>{label}</label>
    <textarea className="form-control" onChange={(e)=>updateData({field,value:e.target.value})} value={value}></textarea>
  </div>);             
}



export const useLaravelCrud =({entity})=>{
 
    const [data,setData] = useState({});
    // const [formD,setFormD] = useState({});
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState('');
    const [error,setError] = useState(false);
    const [response,setResponse] = useState([]);
    const [urlQuery,setUrlQuery] = useState('');
    // const {response,error} = useGet({url:entity});

    const fieldInputs = {};
    const afterCreateHook = [];
    const afterUpdateHook = [];
    const afterFetchHook = [];


    useEffect(()=>{
       doGet({url:entity + urlQuery,setLoading,setResponse});
    },[]);

    useEffect(()=>{
       doGet({url:entity + urlQuery,setLoading,setResponse}); 
    },[urlQuery]);

    function afterCreate(cb){
       afterCreateHook.push(cb);
    }

    function afterUpdate(cb){
      afterUpdateHook.push(cb);  
    }

    function afterFetch(cb){
      afterFetchHook.push(cb);
    }

    function runHooks(hooks){
        each(hooks,({item,key})=>{
            item();
        });
    }


    function index(){
        doGet({url:`${entity + urlQuery}`,setLoading,setResponse});
        setData({});
        runHooks(afterFetchHook);
    }


    function each(data,cb){
        for (var i in data){
            if (data.hasOwnProperty(i)){
                cb({item:data[i],key:i});
            }
        }
    }



    function store(){
       const formData = new FormData;
       each(data,({item,key})=>{
           formData.append(key,item);
       });
       doPost({url:entity,formData,setMessage,setError,setLoading}).then(res=>index());
       runHooks(afterCreateHook);
    }

    function update(){
        const formData = new FormData;
        each(data,({item,key})=>{
            formData.append(key,item);
        });
        doPut({url:`${entity}/${data.id}`,formData,setMessage,setError,setLoading}).then(res=>index()); 
        runHooks(afterUpdateHook);
    }

    function remove({data}){
        if (!confirm('Do you want to remove this record?'))return;
        const formData = new FormData;
        doRemove({url:`${entity}/${data.id}`,formData,setLoading,setMessage,setError}).then(res=>index());
    }


    function TableData(){

    }

    function updateData({field,value}){
        setData({...data,[field]:value}); 
    }

    



    function SelectRow({data}){
      return (<button className="btn btn-sm btn-info" onClick={()=>{
          setData(data);
        //   setFormD(data);
        }}>Preview</button>); 
    }

    function CrudButton({storeText,updateText}){

        const {id} = data;
        if (id){
            return (<button onClick={()=>update({data})} className="btn btn-success">{updateText}</button>);
        }
        return (<button className="btn btn-success" onClick={()=>store()}>{storeText}</button>);

    }

    function RemoveRow({data}){
        return (<button className="btn btn-danger" onClick={()=>remove({data})}>Remove</button>);
    }


    return {
           EntryText,
           EntrySelect,
           EntryTextArea,
           list:response || [],
           SelectRow,
           loading,
           error,
           message,
           CrudButton,
           data,
           updateData,
           RemoveRow,
           reload:index,
           afterCreate,
           afterUpdate,
           afterFetch,
           setUrlQuery
        };

};


export function useSelectChange({url}){
  
    // const [listOther,setListOther] = useState([]);
    const [list,setList] = useState([]);
    const [response,setResponse] = useState([]);
    const [loading,setLoading] = useState(false);
    const [value,setValue] = useState('');

    useEffect(()=>{
       doGet({url,setLoading,setResponse:setList});
    },[]);

    function reload(){
       doGet({url,setLoading,setResponse:setList});
    }

    function onChange({value}){
        setValue(value);
        // reload({params:`${filterField}=${value}`});
    //    doGet({url:`${urlOther}?${filterField}=${value}`,setLoading,setResponse:setListOther});
    }

    return {list,onChange,EntrySelectTrigger,reload,value};

}


export const useModelStats =({entity,id})=>{
   
     const [data,setData] = useState(0);
    //  const [query,setQuery] = useState('');
     const [loading,setLoading] = useState(false);
     const [response,setResponse] = useState([]);

     useEffect(()=>{
         doGet({url:`${entity}/${id}`,setLoading,setResponse});
     },[id]);

     useEffect(()=>{
        setData(response);
     },[response]);

     return {data,loading};

};

