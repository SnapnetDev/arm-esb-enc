import React, { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useResource } from "./useResource";

export const Resource = {};
Resource.Context = React.createContext({});

Resource.Container = ({resource,baseapi,children})=>{
  
  const createRef = useRef(null);

  const editRef = useRef(null);

  const resourceHook = useResource({resource,baseapi});

  const popupWindow = (value,$ref) => {
    
    const overlayCl = $ref.current;
    const modalCl = $ref.current.querySelector('#inner-modal').classList; //classList    

    if (value) {
      overlayCl.classList.remove("hidden");
      setTimeout(() => {
        modalCl.remove("opacity-0");
        modalCl.remove("-translate-y-full");
        modalCl.remove("scale-150");
      }, 100);
    } else {
      modalCl.add("-translate-y-full");
      setTimeout(() => {
        modalCl.add("opacity-0");
        modalCl.add("scale-150");
      }, 100);
      setTimeout(() => overlayCl.classList.add("hidden"), 300);
    }
  };

  const openCreateModal = ()=>{
      popupWindow(true,createRef);
  };
  
  const openEditModal = ()=>{
     popupWindow(true,editRef); 
  };

  const closeCreateModal = ()=>{
    popupWindow(false,createRef);
    resourceHook.setInput({});
  };

  const closeEditModal = ()=>{
    popupWindow(false,editRef);
    resourceHook.setInput({}); 
  };

  const value = {
      openCreateModal,
      openEditModal,
      createRef,
      editRef,
      closeCreateModal,
      closeEditModal,
    //   resourceHook,
      resource,
      baseapi
    };

  return (<Resource.Context.Provider value={{...value,...resourceHook}}>
   {children}
  </Resource.Context.Provider>);
};


//inner-modal
// Resource.Modals = {};
// Resource.Modals.Context = React.createContext({});
// Resource.Modals.Container = ({children})=>{
 
//     const {createRef,closeCreateModal,resource,baseapi} = useContext(Resource.Context);
//     const data = useResource({resource,baseapi});
//     const value = {...data};

//     return (<Resource.Modals.Context.Provider value={value}>
//         {children}
//     </Resource.Modals.Context.Provider>);

// };


Resource.CreateModal = ({title,width,height,children})=>{
   
    const {createRef,closeCreateModal} = useContext(Resource.Context);
    // const resourceData = useContext(Resource.Modals.Context);
    
    return (<>
    
    <div
      ref={createRef}
      className="hidden z-50 absolute inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0 overflow-scroll"
    >
    <div
      id="inner-modal"
      className={`
                container
                mx-auto
                bg-white
                ${width ? width : "w-2/6"}
                ${height ?? ""}
                rounded-md
                pl-6
                pr-6
                pb-6
                pt-6
                opacity-0
                transform
                -translate-y-full
                scale-150
                relative
                shadow-lg
                transition-opacity transition-transform
                duration-300
                overflow-scroll
              `}
    >
      {/* <!-- modal header --> */}
      <div className="flex justify-between pt-4 pb-4">
        <h6 className="text-lg">{title}</h6>
        {/* <!-- close button --> */}
        <button onClick={closeCreateModal}>
          <i className="ri-close-line hover:text-red-400 text-lg text-gray-600"></i>
        </button>
      </div>
      {/* <!-- modal body --> */}
      {children}
    </div>
    </div>

    </>);

};


Resource.EditModal = ({title,width,height,children})=>{
   
    const {editRef,closeEditModal} = useContext(Resource.Context);
    // const resourceData = useContext(Resource.Modals.Context);    

    return (<>
    
    <div
      ref={editRef}
      className="hidden z-50 absolute inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0 overflow-scroll"
    >
    <div
      id="inner-modal"
      className={`
                container
                mx-auto
                bg-white
                ${width ? width : "w-2/6"}
                ${height ?? ""}
                rounded-md
                pl-6
                pr-6
                pb-6
                pt-6
                opacity-0
                transform
                -translate-y-full
                scale-150
                relative
                shadow-lg
                transition-opacity transition-transform
                duration-300
                overflow-scroll
              `}
    >
      {/* <!-- modal header --> */}
      <div className="flex justify-between pt-4 pb-4">
        <h6 className="text-lg">{title}</h6>
        {/* <!-- close button --> */}
        <button onClick={closeEditModal}>
          <i className="ri-close-line hover:text-red-400 text-lg text-gray-600"></i>
        </button>
      </div>
      {/* <!-- modal body --> */}
      {children}
    </div>
    </div>

    </>);

};

Resource.Input = ({label,source,width,...rest})=>{

    const {bindInput} = useContext(Resource.Context);

    console.log(width,'WIDTH.');

    return (<>
      <div className={`form-control ${width? width:'flex-1'} `}>
          <label className="label text-gray-700 font-light text-sm">
              <span className="label-text">{label}</span>
          </label>
          <input {...bindInput(source)} placeholder={label} className="input input-bordered text-gray-700 font-light text-xs w-full" {...rest} />
      </div>
    </>);
};


Resource.InputSelectDummy = ({label,width,source,children,...rest})=>{

  const {bindInput} = useContext(Resource.Context);

  return (<>
    <div className={`form-control ${width ?? "flex-1"} `}>
        <label className="label text-gray-700 font-light text-sm">
            <span className="label-text">{label}</span>
        </label>
        <select {...bindInput(source)} placeholder={label} className="input input-bordered text-gray-700 font-light text-xs w-full" {...rest}>{children}</select>        
    </div>
  </>);
};

Resource.InputSelectData = ({children,label,source,width,resource,text='name',value='id',...rest})=>{

  const {bindInput,baseapi,data:dataList} = useContext(Resource.Context);
  const {data,index} = useResource({resource,baseapi});

  useEffect(()=>{
    index();
  },[dataList]);

  let list = data || [];

  return (<>
    <div className={`form-control ${width ?? "flex-1"} `}>
        <label className="label text-gray-700 font-light text-sm">
            <span className="label-text">{label}</span>
        </label>
        <select {...bindInput(source)} placeholder={label} className="input input-bordered text-gray-700 font-light text-xs w-full" {...rest}>
          {children}
          {list.map((item,key)=>(<option key={key} value={item[value]}>{item[text]}</option>))}
        </select>        
    </div>
  </>);
};

Resource.Button = ({children,...rest})=>{

    const {store,closeCreateModal} = useContext(Resource.Context);

    return (<>
      <button onClick={
          async ()=>
          {
            const {message,error,data} = await store();
            if (!error){
               closeCreateModal();
            }
          }
      } className="btn btn-outline border-french-violet-1 text-french-violet-1 flex-1 text-xs capitalize font-normal">
          {children}
      </button>
    </>);
};

Resource.ButtonCloseModal = ({children,...rest})=>{

  const {store,closeCreateModal,closeEditModal} = useContext(Resource.Context);

  return (<>
    <button onClick={
        ()=>
        {
          closeCreateModal();
          closeEditModal();
        }
    } className="btn btn-outline border-french-violet-1 text-french-violet-1 flex-1 text-xs capitalize font-normal">
        {children}
    </button>
  </>);
};


Resource.EditButton = ({children,...rest})=>{

  const {store,closeEditModal,update,input} = useContext(Resource.Context);

  const {id} = input;
  return (<>
    <button onClick={
        async ()=>
        {
          const {message,error,data} = await update(id);
          if (!error){
            closeEditModal();
          }
        }
    } className="btn btn-outline border-french-violet-1 text-french-violet-1 flex-1 text-xs capitalize font-normal">
        {children}
    </button>
  </>);
};


//"btn btn-outline border-french-violet-1 text-french-violet-1 flex-1 text-xs capitalize font-normal"

Resource.InputTextArea = ({label,width,source,...rest})=>{

    const {bindInput} = useContext(Resource.Context);

    return (<>
      <div  className={`form-control ${width ?? "flex-1"} `}>
          <label className="label text-gray-700 font-light text-sm">
              <span className="label-text">{label}</span>
          </label>
          <textarea {...bindInput(source)} placeholder={label} className="textarea h-36 textarea-bordered text-gray-700 font-light text-xs w-full shadow" {...rest} />
      </div>
    </>);
};

Resource.InputFile = ({label,source,...rest})=>{

    const {bindInputFile} = useContext(Resource.Context);

    return (<>
      <div class="form-control flex-1 ">
          <label class="label text-gray-700 font-light text-sm">
              <span class="label-text">{label}</span>
          </label>
          <input {...bindInputFile(source)} placeholder={label} class="input input-bordered text-gray-700 font-light text-xs w-full" {...rest} />
      </div>
    </>);

};

Resource.Thead = ({children})=>{
    return (<thead className="uppercase text-sm text-left border-b">
    <tr className="h-14">
      {children}
    </tr>
  </thead>);
};

Resource.Tbody = ({children})=>{
    return (<tbody className="text-xs ">
        {children}
    </tbody>);
};
Resource.TrContext = React.createContext({});

Resource.Tr = ({children})=>{
    const r = useContext(Resource.Context);
    const {data,index} = r;
    console.log(r);

    // index();
    
    useEffect(()=>{
        console.log(data,'seen-data');
        index();
    },[]);
    // console.log('after',data);
    const list = data || [];
    // console.log(list);
    return (<>
    {/* key={key} */}
        {list.map((item,key)=>(<Resource.TrContext.Provider key={key} value={item}>
          <tr className="border-b">
            {children}
          </tr>
        </Resource.TrContext.Provider>))}
    </>);
};

Resource.Td = ({source,...rest}) => {
   const data = useContext(Resource.TrContext);
   return (<td className="px-6 py-6" {...rest}>{data[source]}</td>);
};

Resource.TdPreviewButton = ()=>{
    const data = useContext(Resource.TrContext);
    const {openEditModal,showEdit} = useContext(Resource.Context);
    return (<>
    <button
      onClick={
          ()=>{
              showEdit(data);
              openEditModal();
          }
      }
             className="text-sm hover:text-gun-metal-3 py-2">
             <i className="ri-eye-line hover:text-gun-metal-3 text-lg inline-block align-middle mr-1 mb-1"></i> Preview
    </button>    
    </>);
};

Resource.TdLink = ({to,children,...rest})=>{
  const data = useContext(Resource.TrContext);
  // const {openEditModal,showEdit} = useContext(Resource.Context);
  return (<>
   <NavLink to={to(data)} {...rest}>{children}</NavLink>
  </>);
};


Resource.AddButton = ({children})=>{
    
    const {openCreateModal} = useContext(Resource.Context);

    return (<button className="bg-french-violet-1 hover:bg-french-violet-4 text-white text-xs w-36 h-10 md:text-xs md:w-40 md:h-12 border rounded-lg" onClick={
        ()=>{
           openCreateModal(); 
        }
    }>
    {children}
  </button>);

};


Resource.TdDeleteButton = ({source})=>{
    const data = useContext(Resource.TrContext);
    const {deleteRecord} = useContext(Resource.Context);
    return (<>
           <button 
           onClick={
               ()=>deleteRecord(data[source])
           } 
           className="text-sm text-red-600 hover:text-red-400 py-2">
             <i className="ri-delete-bin-6-line text-red-600 hover:text-red-400 text-lg inline-block align-middle"></i>Delete
           </button>
    </>);
};

Resource.Th = ({children,...rest})=>{
  
    return (<>
          <th className="font-normal w-auto px-6 py-6" {...rest}>
          {/* w-7/12 */}
              {children}
           </th>
      {/* <th className="font-normal w-1/5 px-6 py-6">Name</th>
      <th className="font-normal w-7/12 px-6 py-6">Headers</th>
      <th className="font-normal w-1/3 px-6 py-6">Actions</th> */}
    </>);

};

Resource.Table = ({children})=>{

 return (<table className="table-auto w-full overflow-x-scroll bg-white">
     {children}
 {/* <thead className="uppercase text-sm text-left border-b">
 </tbody> */}
</table>);

};


Resource.MessageLog = ()=>{

  const {store,closeCreateModal,update,input,data,message,errors,error} = useContext(Resource.Context);
  

  useEffect(()=>{
     if (message){
     
        if (error){
          let messages = Object.values(errors);

          messages.forEach((errorMessage)=>{
            toastr.error(errorMessage);
          }); 
         
          return;
        }

        toastr.success(message);

     }
  },[message,errors,error]);

  const {id} = input;
  return (<></>);
};

//setUrlQuery
Resource.InputTrigger = ({label,source,...rest})=>{

    const {bindInput,setUrlQuery,urlQuery} = useContext(Resource.Context);

    return (<>
      <div className="form-control flex-1 ">
          <label className="label text-gray-700 font-light text-sm">
              <span className="label-text">{label}</span>
          </label>
          <input onChange={(e)=>{
                 
                 setUrlQuery({...urlQuery,[source]:e.target.value});

          }} placeholder={label} className="input input-bordered text-gray-700 font-light text-xs w-full" {...rest} />
      </div>
    </>);
};

//urlQuery

Resource.InputSelectDataTrigger = ({children,label,source,width,resource,text='name',value='id',...rest})=>{

  const {bindInput,baseapi,setUrlQuery,urlQuery,data:dataList} = useContext(Resource.Context);
  const {data,index} = useResource({resource,baseapi});

  useEffect(()=>{
    index();
  },[dataList]);

  let list = data || [];

 return (<>
   <div className={`form-control ${width ?? "flex-1"} items-end`}>
      <select  
        
        onChange={
          (e)=>{
            setUrlQuery({...urlQuery,[source]:e.target.value});
          }
        } className="select select-bordered w-full text-xs font-light border-french-violet-1 focus:border-french-violet-1 focus:ring-2">
          <option select="selected">{label}</option>
          {list.map((item,key)=>(<option key={key} value={item[value]}>{item[text]}</option>))}
      </select>
    </div>
 </>); 

};
