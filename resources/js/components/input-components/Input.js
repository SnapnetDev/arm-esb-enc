import { AppContext } from "../AppContext";
import { useContext } from "react";
import { setJsonField } from "../../reducers/AppReducer";
import { apiPost, apiPut } from "../Helpers";
import { Entity } from "../Entity";

export function InputText({ label, type, field, store, ...attr }) {
  // {...attr}
  const { state, dispatch } = useContext(AppContext);
  state.json[store] = state.json[store] || {};
  const value = state.json[store][field] || "";
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        {...attr}
        type={type}
        className="form-control"
        onChange={(e) =>
          setJsonField({
            dispatch,
            state,
            key: field,
            value: e.target.value,
            store,
          })
        }
        value={value}
        placeholder={label}
      />
    </div>
  );
}

export function InputTextArea({ label, field, store, ...attr }) {
  // {...attr}
  const { state, dispatch } = useContext(AppContext);

  state.json[store] = state.json[store] || {};
  const value = state.json[store][field] || "";

  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        {...attr}
        className="form-control"
        onChange={(e) =>
          setJsonField({
            dispatch,
            state,
            key: field,
            value: e.target.value,
            store,
          })
        }
        value={value}
        placeholder={label}
      />
    </div>
  );
}

export function InputSelect({
  label,
  field,
  store,
  data,
  idField,
  valueField,
  defaultId,
  defaultValue,
  ...attr
}) {
  // {...attr}
  const { state, dispatch } = useContext(AppContext);

  state.json[store] = state.json[store] || {};
  const value = state.json[store][field] || "";

  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        {...attr}
        className="form-control"
        onChange={(e) =>
          setJsonField({
            dispatch,
            state,
            key: field,
            value: e.target.value,
            store,
          })
        }
        value={value}
        placeholder={label}
      >
        <option value={defaultId}>{defaultValue}</option>
        {data.map((item, key) => (
          <option key={key} value={item[idField]}>
            {item[valueField]}
          </option>
        ))}
      </select>
    </div>
  );
}

export function StoreUpdateButton({ entity, textStore, textUpdate, ...attr }) {
  // {...attr}
  const { state, dispatch } = useContext(AppContext);
  const entityObj = new Entity({ entity, dispatch, state });
  state.json[entity] = state.json[entity] || {};
  const value = state.json[entity]["id"] || "";
  return (
    <div className="col-4">
      {value == "" ? (
        <button
          {...attr}
          onClick={() => entityObj.store()}
          type="button"
          className="btn btn-primary btn-block"
        >
          {textStore}
        </button>
      ) : (
        <button
          {...attr}
          onClick={() => entityObj.update()}
          {...attr}
          type="button"
          className="btn btn-primary btn-block"
        >
          {textUpdate}
        </button>
      )}
    </div>
  );
}

export function AuthButton({ store, ...attr }) {
  // {...attr}
  const { state, dispatch } = useContext(AppContext);
  const entityObj = new Entity({ entity: store, dispatch, state });
  return (
    <button
      {...attr}
      onClick={() => entityObj.login()}
      type="button"
      className="btn btn-primary btn-block"
    >
      Login
    </button>
  );
}
