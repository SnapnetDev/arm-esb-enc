import {useState} from 'react';
const headers = {};
//"Authorization":"Bearer token"
//"Accept":"application/json"
export const useAjax = ({baseapi}) =>{

     const [loading,setLoading] = useState(false);
     
     const get = async ({api}) =>{
        setLoading(true); 
        const response = await fetch(`${baseapi}${api}`,{method:'GET',headers}).then(res=>res.json()); //.json();
        setLoading(false);
        console.log(response,'resp');
        return response;
     };

     const post = async ({api,data})=>{
        setLoading(true); 
        const fd = new FormData;
        for (let i in data){
          if (data.hasOwnProperty(i)){
             fd.append(i,data[i]);  
          }             
        }
        const response = await fetch(`${baseapi}${api}`,{method:'POST',body:fd,headers}).then(res=>res.json()); //.json();
        setLoading(false);
        return response;
     };

     return {get,post,loading};

};