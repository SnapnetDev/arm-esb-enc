import {useState} from 'react';

export const useInput = () =>{
  
     const [input,setData] = useState({});

     const updateData = (k,v) =>setData({...input,[k]:v});
     const setInput = (data) =>setData(data);

     const bindInput = (source)=>{
       return {
          value:input[source] || '',
          onChange:(e)=>updateData(source,e.target.value) 
       };
     };

     const bindInputFile = (source) =>{
        return {
            onChange:(e)=>updateData(source,e.target.files[0]) 
         };  
     };

     return {input,bindInput,bindInputFile,setInput,updateData};

};