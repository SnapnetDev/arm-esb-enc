import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { API_PATH } from "./Config";
import { Entity } from "./Entity";
import {
  clearJson,
  populateJson,
  setAuth,
  setData,
  setLoading,
  setMessage,
} from "../reducers/AppReducer";

export function each(obj, cb) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      cb(obj[i], i);
    }
  }
}

export function apiPost({ url, dispatch, state }) {
  var form = new FormData();
  for (var i in state.json) {
    if (state.json.hasOwnProperty(i)) {
      form.append(i, state.json[i]);
    }
  }
  setLoading({ dispatch, state, value: true });
  return fetch(API_PATH + url, {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then(({ message, error, token }) => {
      setLoading({ dispatch, state, value: false });
      if (!error) clearJson({ dispatch, state });
      setMessage({ dispatch, state, error, message });
      if (token) setAuth({ dispatch, state, token });

      return new Promise((resolve, reject) => resolve({ message, error }));
    });
}

export function apiPut({ url, dispatch, state }) {
  var form = new FormData();
  for (var i in state.json) {
    if (state.json.hasOwnProperty(i)) {
      form.append(i, state.json[i]);
    }
  }
  form.append("_method", "PUT");
  setLoading({ dispatch, state, value: true });
  return fetch(API_PATH + url, {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then(({ message, error }) => {
      setLoading({ dispatch, state, value: false });
      if (!error) clearJson({ dispatch, state });
      setMessage({ dispatch, state, error, message });
      return new Promise((resolve, reject) => resolve({ message, error }));
    });
}

export function apiDelete({ url, dispatch, state }) {
  if (confirm("Do you want to proceed with this action?")) {
    var form = new FormData();
    //  for (var i in state.json){
    //      if (state.json.hasOwnProperty(i)){
    //         form.append(i,state.json[i]);
    //      }
    //  }
    form.append("_method", "DELETE");
    setLoading({ dispatch, state, value: true });
    return fetch(`${API_PATH}${url}`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then(({ message, error }) => {
        setLoading({ dispatch, state, value: false });
        if (!error) clearJson({ dispatch, state });
        setMessage({ dispatch, state, error, message });
        return new Promise((resolve, reject) => resolve({ message, error }));
      });
  }
}

export function apiFetch({ url, dispatch, state, store }) {
  setLoading({ dispatch, state, value: true });
  return fetch(API_PATH + url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      setLoading({ dispatch, state, value: false });
      setData({ dispatch, state, key: store, value: res });
      return new Promise((resolve, reject) => resolve(res));
    });
}

const style = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
};

export function TableData({ header, entity, row, className }) {
  const Header = header;
  const { state, dispatch } = useContext(AppContext);
  const Row = row;
  const entityObj = new Entity({ entity, dispatch, state });
  useEffect(() => {
    entityObj.index();
  }, []);

  const data = state.data[entity] || [];

  return (
    <table className={className} style={style}>
      <thead>
        <Header />
      </thead>
      <tbody>
        {data.map((item, key) => (
          <Row
            data={item}
            key={key}
            entity={entity}
            select={selectRow}
            remove={removeRow}
          />
        ))}
      </tbody>
    </table>
  );
}

function selectRow({ data, entity }) {
  const { state, dispatch } = useContext(AppContext);
  return (
    <button
      className="btn btn-sm btn-warning"
      onClick={() => populateJson({ state, dispatch, data, store: entity })}
    >
      Preview
    </button>
  );
}

function removeRow({ entity, data }) {
  const { state, dispatch } = useContext(AppContext);
  const entityObj = new Entity({ entity, dispatch, state });
  const { id } = data;
  return (
    <button
      className="btn btn-sm btn-danger"
      onClick={() => entityObj.destroy(id)}
    >
      Remove
    </button>
  );
}
