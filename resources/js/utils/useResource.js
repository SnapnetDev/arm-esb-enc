import {useAjax} from '../utils/ajaxHook';
import {useInput} from '../utils/inputHook';
import React, {useContext, useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router';
import { Resource } from './UI';

export const useResource = ({resource,baseapi}) =>{
  
    const {loading,get,post} = useAjax({baseapi});
    const [data,setData] = useState([]);
    const {input,setInput,bindInput,bindInputFile,updateData} = useInput();
    // const {id} = useParams();
    const [messageError,setMessageError] = useState({message:'',error:false,errors:{}});
    const {message,error,errors} = messageError;

    const [urlQuery,setUrlQuery] = useState({});

    const getUrlQuery = ()=>{
      let r = [];
      for (var i in urlQuery){
        if (urlQuery.hasOwnProperty(i)){
           r.push(`${i}=${urlQuery[i]}`);
        }
      }
      return `?${r.join('&')}`;
    };
    
    const {
      openCreateModal,
      openEditModal,
      closeEditModal,
      closeCreateModal
    } = useContext(Resource.Context);

    useEffect(()=>{
       if (JSON.stringify(urlQuery) != '{}'){
          index();  
       }  
    },[urlQuery]);

    const index = async () =>{
      const {data} = await get({api:resource + getUrlQuery()});
      // const {data} = resp;
      // console.log(data,'mmmmm',resp),'mmmmm';
      //...data.data
      setData(data);
    };

    const showEdit = (data)=>{
      setInput(data);
        // return {
        //   onClick:()=>{
        //       setInput(data);
        //       // openEditModal();
        //   }           
        // };
    };

    const bindShowCreate = ()=>{
      return {
        onClick:()=>{
          // openCreateModal();
        }
      };
    };

    const show = (id) =>{
      const {data} = get({api:`${resource}/${id}`});        
      setInput(data);
    };

    const update = async (id)=>{
       let {message,error,data,errors} = await post({api:`${resource}/${id}`,data:{
         ...input,_method:'PUT'
       }});
       setMessageError({message,error,errors});
       setMessageError({message:'',error});
       if (!error){ //ux
          setInput({});
          // closeEditModal();
          index();
       }
       return {message,error,data,errors};
    };

    const deleteRecord = async (id)=>{
      if (confirm("Do you want to perform this action?")){
        let {message,error,data} = await post({api:`${resource}/${id}`,data:{
          ...input,_method:'DELETE'
        }});
        setMessageError({message,error});  
        setMessageError({message:'',error});  
        index();
      }
    };

    const store = async ()=>{
      let {message,error,data,errors} = await post({api:`${resource}`,data:{
        ...input
      }});
      console.log(message,error,';;;;;;');
      setMessageError({message,error,errors});
      setMessageError({message:'',error});
      if (!error){//ux
        setInput({});
        // closeCreateModal();
        index();
        // return;
      }
      return {message,error,data,errors};
      
    };

    return {
        index,
        show,
        update,
        deleteRecord,
        store,
        input,
        bindInput,
        bindInputFile,
        bindShowCreate,
        showEdit,
        message,
        error,
        errors,
        data,
        messageError,
        setInput,
        setUrlQuery,
        urlQuery,
        updateData,
        loading
    };

}