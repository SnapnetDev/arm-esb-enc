import { useEffect, useRef, useState } from "react";
import { API_PATH } from "./Config";

export const useCounter = ({ initial }) => {
  const [count, setCount] = useState(initial);
  const [value, setValue] = useState("");
  const [metta, setMetta] = useState("");

  const bindInc = {
    onClick: (e) => {
      setCount(count + 1);
    },
  };

  const bindDec = {
    onClick: (e) => {
      setCount(count - 1);
    },
  };

  const bindInput = {
    //    value,
    onChange: (e) => {
      if (e.target.type == "file") {
        setMetta(`Type: ${e.target.type} , Name: ${e.target.name} , Value: ${e.target.files[0].name}`);
        console.log(e.target.files[0]);
        setValue("....Value Set...");
        return;
      }
      setMetta(`Type: ${e.target.type} , Name: ${e.target.name} , Value: ${e.target.value}`);
      setValue(e.target.value);
    },
  };

  return { count, bindInc, bindDec, bindInput, value, metta };
};

function doPost({ url, setLoading, data, setMessageError, setData }) {
  setLoading(true);
  const formData = new FormData();
  each(data, ({ item, key }) => {
    formData.append(key, item);
  });
  // formData.append('_method','PUT');

  return fetch(`${API_PATH + url}`, {
    method: "POST",
    body: formData,
    // headers:{
    //   'Accept':'application/json'
    // }
  })
    .then((res) => res.json())
    .then(({ message, error, errors, data: data_ }) => {
      // setMessageError({message,error});
      // setMessageError({message:'',error:false});

      if (!errors) {
        setMessageError({ message, error });
      }

      setMessageError({ message: "", error: true });

      // setMessage(message);
      // setError(error);
      setLoading(false);
      // setMessage('');

      if (errors) {
        for (var i in errors) {
          setMessageError({ message: errors[i], error: true });
        }
        setData(data_);
      }

      return blankPromise();
    })
    .catch((error) => {
      setMessageError({ message: "Something went wrong!", error: true });
      setMessageError({ message: "", error: false });
      //  setError(true);
      //  setMessage(error);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });
}

function doFetch({ url, setLoading, setResponse, setMessageError, pivot }) {
  setLoading(true);
  return fetch(`${API_PATH + url}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      //  if (pivot != 'root'){
      //    setResponse(res[pivot]);
      //  }
      setResponse(res);
      setLoading(false);
      return blankPromise();
    })
    .catch((error) => {
      setMessageError({ message: "Something went wrong!", error: true });
      setMessageError({ message: "", error: true });
      // setError(true);
      // setMessage(error);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });
}

function each(data, cb) {
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      cb({ item: data[i], key: i });
    }
  }
}

function doPut({ url, setLoading, setMessageError, data, setData }) {
  setLoading(true);
  const formData = new FormData();
  console.log(data);
  each(data, ({ item, key }) => {
    console.log(item, key);
    formData.append(key, item);
  });
  formData.append("_method", "PUT");

  return fetch(`${API_PATH + url}`, {
    method: "POST",
    body: formData,
    // headers:{
    //   'Accept':'application/json'
    // }
  })
    .then((res) => res.json())
    .then(({ message, error, errors, data: data_ }) => {
      if (!errors) {
        setMessageError({ message, error });
      }

      setMessageError({ message: "", error: true });
      // setMessage(message);
      // setError(error);
      setLoading(false);

      if (errors) {
        for (var i in errors) {
          setMessageError({ message: errors[i], error: true });
        }
        setData(data_);
      }

      // setMessage('');
      return blankPromise();
    })
    .catch((error) => {
      // console.log(error);
      setMessageError({ error: true, message: "Something went wrong!" });
      setMessageError({ message: "", error: true });
      //  setError(true);
      //  setMessage(error);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });
}

function blankPromise() {
  return new Promise((r) => r());
}

function doDelete({ url, setLoading, setMessageError }) {
  setLoading(true);
  const formData = new FormData();
  formData.append("_method", "DELETE");

  return fetch(`${API_PATH + url}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then(({ message, error }) => {
      setMessageError({ message, error });
      setMessageError({ message: "", error: false });
      // setMessage(message);
      // setError(error);
      setLoading(false);
      return blankPromise();
    })
    .catch((error) => {
      //  setError(true);
      //  setMessage(error);
      setMessageError({ message: "Something went wrong!", error: true });
      setMessageError({ message: "", error: false });
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });
}

export const useInputData = () => {
  const [data, setData] = useState({});

  const updateData = (k, v) => {
    setData({ ...data, [k]: v });
  };

  const reset = () => {
    setData({});
  };

  const bindResetButton = () => {
    return {
      onClick: () => {
        reset();
      },
    };
  };

  const bindInput = (name, defaultValue = "") => {
    return {
      value: data[name] || defaultValue,
      onChange: (e) => {
        updateData(name, e.target.value);
      },
    };
  };

  const getData =(source)=>{
     return data[source] || '';
  };
  const $setData =(source,value)=>{
     updateData(source,value);
  };

  const bindFileInput = (name) => {
    return {
      onChange: (e) => {
        updateData(name, e.target.files[0]);
      },
    };
  };

  return { reset, bindResetButton, bindInput, bindFileInput, setData, data , getData, $setData  };
};

export const useCrud = ({ resource, startResource, idParam, pivot }) => {
  startResource = startResource || "index";
  idParam = idParam || "0";
  pivot = pivot || "root";
  const [indexUrl, setIndexUrl] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [showUrl, setShowUrl] = useState("");
  const [updateUrl, setUpdateUrl] = useState("");
  const [destroyUrl, setDestroyUrl] = useState("");
  const [queryUrl, setQueryUrl] = useState("");

  //  const [data,setData] = useState({});
  const [list, setList] = useState([]);
  //  const [message,setMessage] = useState('');
  //  const [error,setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState({
    message: "",
    error: false,
  });

  const { message, error } = messageError;

  const { reset, bindResetButton, bindInput, bindFileInput, setData, data , getData , $setData } = useInputData();
  const { ref_, closeModalRef_, bindOpenModal, bindCloseModal, openModal, closeModal, Modal } = useModalV2();

  //  useEffect(()=>{

  //    if (!error){
  //     // setData({});
  //    }

  //  },[error]);

  const setResource = (resource) => {
    setIndexUrl(resource);
    setStoreUrl(resource);
    setShowUrl(resource);
    setUpdateUrl(resource);
    setDestroyUrl(resource);
  };

  useEffect(() => {
    setResource(resource);
  }, []);

  function index() {
    doFetch({ url: indexUrl + queryUrl, setResponse: setList, setLoading, setMessageError, pivot });
    closeModal();
    setData({});
  }

  function show() {
    doFetch({ url: showUrl + "/" + idParam + queryUrl, setResponse: setList, setLoading, setMessageError, pivot });
    closeModal();
    // setData({});
  }

  if (startResource == "index") {
    useEffect(() => {
      if (indexUrl && indexUrl != "") {
        index();
        console.log(indexUrl);
      }
    }, [indexUrl, queryUrl]);
  }

  if (startResource == "show") {
    useEffect(() => {
      if (showUrl && showUrl != "") {
        show();
        console.log(showUrl);
      }
    }, [showUrl, queryUrl]);
  }

  const bindCreateUpdateButton = ({ textCreate, textUpdate }, cb) => {
    return {
      // className:data.id? 'btn btn-sm btn-warning':'btn btn-sm btn-success',
      value: data.id ? textUpdate : textCreate,
      onClick: () => {
        if (cb) cb();
        if (data.id) {
          doPut({ url: updateUrl + "/" + data.id, setMessageError, setData, setLoading, data }).then((res) => {
            index();
          });
          return;
        }
        doPost({ url: storeUrl, setMessageError, setData, setLoading, data }).then((res) => {
          index();
        });
      },
    };
  };

  const bindCreateUpdateButtonModal = ({ textCreate, textUpdate }) => {
    return {
      className: data.id ? "btn btn-sm btn-warning" : "btn btn-sm btn-success",
      value: data.id ? textUpdate : textCreate,
      onClick: () => {
        closeModal();
        if (data.id) {
          doPut({ url: updateUrl + "/" + data.id, setMessageError, setData, setLoading, data }).then((res) => {
            index();
          });
          return;
        }
        doPost({ url: storeUrl, setMessageError, setData, setLoading, data }).then((res) => {
          index();
        });
      },
    };
  };

  const bindDeleteButton = ({ id }) => {
    return {
      onClick: () => {
        if (!confirm("Do you want to proceed with this action?")) return;
        doDelete({ url: destroyUrl + "/" + id, setLoading, setMessageError }).then((res) => {
          index();
        });
      },
    };
  };

  const selectRow = (data) => {
    setData(data);
  };

  const bindSelectRow = (data, cb) => {
    return {
      onClick: () => {
        selectRow(data);
        if (cb) cb();
      },
    };
  };

  const bindSelectRowModal = (data) => {
    return {
      onClick: () => {
        selectRow(data);
        openModal();
      },
    };
  };

  const modalAttr = () => {
    return {
      ref_,
      closeModalRef_,
    };
  };

  return {
    data,
    getData,
    $setData,
    selectRow,
    setResource,
    setDestroyUrl,
    setIndexUrl,
    setUpdateUrl,
    setStoreUrl,
    bindInput,
    bindFileInput,
    bindSelectRow,
    list,
    error,
    message,
    loading,
    bindDeleteButton,
    bindCreateUpdateButton,
    reload: index,
    bindResetButton,
    reset,
    bindSelectRowModal,
    Modal,
    modalAttr,
    bindCreateUpdateButtonModal,
    bindOpenModal,
    showUrl,
    setShowUrl,
    setQueryUrl,
  };
};

export const useInputChange = () => {
  const [value, setValue] = useState("");

  const bindInputChange = () => {
    return {
      value,
      onChange: (e) => {
        setValue(e.target.value);
      },
    };
  };

  return { value, bindInputChange };
};

export const useModalTrigger = () => {
  const [visible, setVisible] = useState(false);

  const triggerOpen = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1000);
  };

  const bindOpenModal = (cb) => {
    return {
      onClick: () => {
        triggerOpen();
        if (cb) cb();
      },
    };
  };

  return { visible, bindOpenModal, triggerOpen };
};

export const useAjaxCall = ({ url, method }) => {
  const [response, setResponse] = useState("");
  const { data, setData, bindInput, bindFileInput } = useInputData();
  const [loading, setLoading] = useState(false);

  const bindAjaxTrigger = () => {
    return {
      onClick: () => {
        //    alert('clicked...' + url);
        callResource();
      },
    };
  };

  const callResource = () => {
    const formData = new FormData();
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        formData.append(i, data[i]);
      }
    }
    // alert('About calling');
    setLoading(true);
    let config = {};
    config.method = method;

    if (method == "POST") config.body = formData;

    fetch(`${url}`, config)
      .then((res) => res.json())
      .then((res) => {
        // alert('About called');
        setLoading(false);
        setResponse(res);
      })
      .catch((err) => {
        // alert('About Error');
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    //  load();
  }, []);

  return { response, bindInput, bindAjaxTrigger, callResource, loading, data };
};

export const useModalV2 = () => {
  const ref_ = useRef(null);
  const closeModalRef_ = useRef(null);

  const openModal = () => {
    $(ref_.current).modal();
  };

  const bindOpenModal = () => {
    return {
      onClick: () => {
        openModal();
      },
    };
  };

  const closeModal = () => {
    if (closeModalRef_.current) $(closeModalRef_.current).trigger("click");
  };

  const bindCloseModal = () => {
    return {
      onClick: () => {
        closeModal();
      },
    };
  };

  return {
    ref_,
    closeModalRef_,
    bindOpenModal,
    bindCloseModal,
    Modal: ModalTemplate,
    openModal,
    closeModal,
  };
};

const ModalTemplate = ({ children, large, bindAction, ref_, closeModalRef_, title }) => {
  // const ref = useRef(null);
  // const closeModalRef = useRef(null);

  return (
    <div ref={ref_} className="modal fade" role="dialog">
      <div className={"modal-dialog " + (large ? " modal-lg" : "")}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="row">{children}</div>
            {/* <p>Some text in the modal.</p> */}
          </div>
          <div className="modal-footer">
            <input type="button" {...bindAction()} />
            <button ref={closeModalRef_} type="button" className="btn btn-default" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
