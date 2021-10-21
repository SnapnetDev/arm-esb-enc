
export const initialState = {
    message:'',
    error:false,
    loading:false, 
    loggedIn:false,
    token:null,
    json:{},
    data:{},
    url_query:{}
};

export default function AppReducer(state , action){
   action.payload = action.payload || {};
   const {store,key,value,token,message,error} = action.payload; 
   switch(action.type){
      case 'set-url-query':
        //   const {entity,key,value} = action.payload;
          state.url_query[store] = state.url_query[store] || {};
          state.url_query[store][key] = value;
          return {...state}; 
      case 'clear-auth':
          localStorage.removeItem('esb_token'); 
          return {...state,token:undefined};
      case 'set-auth':
          localStorage.setItem('esb_token',token);
          return {...state,token}; 
      case 'set-logged-in':
          return {...state,loggedIn:value}; 
      case 'set-loading':
          state.loading = value;
          return {...state}; 
      case 'set-message':
          return {...state,message,error};
      case 'set-data':
          state.data[key] = value;
          return {...state};
       case 'set-json-field':
           state.json[store] = state.json[store] || {};
           state.json[store][key] = value;
        //    console.log(state);
           return {...state};
       case 'clear-json':
           state.json[store] = state.json[store] || {};
           state.json[store] = {};
           return {...state};               
       default:
          return state;
   }
}

export function setLoading({dispatch,state,value}){
    dispatch({
        type:'set-loading',
        payload:{
            value
        }
    });
}

export function setMessage({dispatch,state,error,message}){
    dispatch({
        type:'set-message',
        payload:{message,error}
    });
    dispatch({
        type:'set-message',
        payload:{message:'',error:false}
    });
}

export function setData({dispatch,state,key,value}){
    dispatch({
        type:'set-data',
        payload:{key,value}
    });
}

export function setJsonField({dispatch,state,key,value,store}){
    dispatch({
        type:'set-json-field',
        payload:{
            key,value,store
        }
    });
}

export function clearJson({dispatch,state,store}){
    dispatch({
        type:'clear-json',
        payload:{store}
    });
}

export function populateJson({state,dispatch,data,store}){
   for (var i in data){
     if (data.hasOwnProperty(i)){
         setJsonField({dispatch,state,key:i,value:data[i],store});
     }
   }
}

export function setLoggedIn({dispatch,state,value}){
    dispatch({
        type:'set-logged-in',
        payload:{
            value
        }
    });
}


export function setAuth({dispatch,state,token}){
    dispatch({
        type:'set-auth',
        payload:{
            token
        }
    });
}

export function clearAuth({dispatch,state}){
    dispatch({
        type:'clear-auth'
    });
    setMessage({dispatch,state,error:false,message:'Just logged out...'})
    // setTimeout(()=>setMessage({dispatch,state,error:false,message:'Just logged out...'}),100);
}


export function setUrlQuery({dispatch,state,store,key,value}){
    dispatch({
        type:'set-url-query',
        payload:{store,key,value}
    });
}