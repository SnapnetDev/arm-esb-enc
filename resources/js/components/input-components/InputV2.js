import { AppContext } from "../AppContext";
import { useContext, useState } from "react";
import { setJsonField } from "../../reducers/AppReducer";
import { apiPost, apiPut } from "../Helpers";
import { Entity } from "../Entity";
import { InnerContext } from "../../pages/CredentialsV2";

export const TinputText = ({ label, placeholder, type, width, field, passwordIcon, store, ...rest }) => {
  return (
    <div className={`form-control ${width ?? "flex-1"} `}>
      <label className="label text-gray-700 font-light text-sm">
        <span className="label-text">{label}</span>
      </label>

      {passwordIcon ? (
        <div className="relative">
          <LInputText type={type} placeholder={placeholder} label={label} store={store} {...rest} />
          <button className="absolute top-3 right-3" type="button ">
            <i className="ri-eye-line "></i>{" "}
          </button>
        </div>
      ) : (
        <MyInputText type={type} placeholder={placeholder} label={label} {...rest} />
      )}
    </div>
  );
};

export const MyInputText = ({ type, placeholder, label, ...rest }) => {
  return (
    <input type={`${type ?? "text"}`} placeholder={placeholder ?? label} className="input input-bordered text-gray-700 font-light text-xs w-full" {...rest} />
  );
};

// Login Inputs

export const LInputText = ({ width, type, placeholder, label, store, togglePassword, ...attr }) => {
  const { state, dispatch } = useContext(AppContext);
  state.json[store] = state.json[store] || {};
  const value = state.json[store][type] || "";
  return (
    <div className={`form-control ${width ?? "flex-1"} xl`}>
      <label className="label text-gray-700 font-light text-sm">
        <span className="label-text">{label}</span>
      </label>
      <input
        {...attr}
        onChange={(e) =>
          setJsonField({
            dispatch,
            state,
            key: type,
            value: e.target.value,
            store,
          })
        }
        value={value}
        type={type}
        placeholder={placeholder ?? label}
        className="input input-bordered text-gray-700 font-light text-xs w-full"
      />
    </div>
  );
};

export const LInputPassword = ({ width, type, placeholder, label, store, ...attr }) => {
  const { state, dispatch } = useContext(AppContext);
  state.json[store] = state.json[store] || {};
  const value = state.json[store][type] || "";

  const [showPassword, setShowPassword] = useState(false);

  var togglePassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <label className="label text-gray-700 font-light text-sm">
        <span className="label-text">{label}</span>
      </label>
      <div className="relative">
        <input
          {...attr}
          onChange={(e) =>
            setJsonField({
              dispatch,
              state,
              key: type,
              value: e.target.value,
              store,
            })
          }
          value={value}
          type={!showPassword ? type : "text"}
          placeholder={placeholder ?? label}
          className="input input-bordered text-gray-700 font-light text-xs w-full"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            togglePassword();
          }}
          className="absolute top-3 right-3"
          type="button"
        >
          {!showPassword ? <i class="ri-eye-off-line"></i> : <i className="ri-eye-line "></i>}
        </button>
      </div>
    </div>
  );
};

export const TtextArea = ({ label, placeholder, width, ...rest }) => {
  return (
    <div className={`form-control ${width ?? "flex-1"}`}>
      <label className="label text-gray-700 font-light text-sm">
        <span className="label-text">{label}</span>
      </label>
      <textarea className="textarea h-36 textarea-bordered text-gray-700 font-light text-xs w-full" placeholder={placeholder ?? label} {...rest}></textarea>
    </div>
  );
};

export const TSelectInput = ({ listItems, classNms, width, position, label, placeholder, field, ...rest }) => {
  return (
    <div className={`form-control ${width ?? "flex-1"} ${position}  `}>
      {label ? (
        <label className="label text-gray-700 font-light text-sm">
          <span className="label-text">{label}</span>
        </label>
      ) : (
        ""
      )}
      <select className={`select select-bordered w-full text-xs font-light ${classNms}`} {...rest}>
        <option select="selected">{placeholder ?? label}</option>
        {listItems.map((item, key) => (
          <option key={key} value={item.id}>
            {item[`${field}`]}
          </option>
        ))}
      </select>
    </div>
  );
};

export const TButton = ({ closeModal, text, type, onClick, width, ...rest }) => {
  const { reset } = useContext(InnerContext);

  // console.log(reset, closeModal_);
  const btnClass =
    type === "button"
      ? "btn btn-outline border-french-violet-1 text-french-violet-1 flex-1 text-xs capitalize font-normal"
      : `btn bg-french-violet-1 text-xs capitalize font-normal ${width ? " btn-block" : "flex-1"}`;
  const { value } = rest;
  if (!value) {
    rest.value = text;
  }
  return (
    // value={text}
    <input
      type={type}
      onClick={(e) => {
        // onClick(e);
        if (closeModal) {
          onClick();
          reset();
          return;
        }
        onClick(e);
      }}
      className={btnClass}
      {...rest}
    />
    //   {text}
    // </input>
  );
};

export const TAuthButton = ({ store, width, text, type, ...attr }) => {
  const { state, dispatch } = useContext(AppContext);
  const entityObj = new Entity({ entity: store, dispatch, state });

  const btnClass = `btn bg-french-violet-1 text-xs capitalize font-normal ${width ? " btn-block" : "flex-1"}`;
  return (
    <button type={type} onClick={() => entityObj.login()} className={btnClass} {...attr}>
      {text}
    </button>
  );
};
