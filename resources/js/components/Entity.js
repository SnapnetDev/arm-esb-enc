import { API_PATH } from "./Config";
import { each } from "./Helpers";
import {
  clearAuth,
  clearJson,
  setAuth,
  setData,
  setLoading,
  setMessage,
  setUrlQuery,
} from "../reducers/AppReducer";

export class Entity {
  static hooks = [];

  constructor({ entity, dispatch, state }) {
    this.entity = entity;
    this.dispatch = dispatch;
    this.state = state;
    //   this.hooks = [];
  }

  static addHook($cb) {
    Entity.hooks.push($cb);
  }

  runHooks() {
    each(Entity.hooks, (cb, key) => {
      cb(this);
    });
  }

  getForm() {
    const { entity, state, dispatch } = this;
    state.json[entity] = state.json[entity] || {};
    const json = state.json[entity] || {};
    const formD = new FormData();
    each(json, (item, key) => {
      formD.append(key, item);
    });
    return formD;
  }
  // callHttp({route , method, body}){
  //  return fetch(route,{
  //    method,
  //    body
  //  });
  // }

  login() {
    ////
    const loginForm = this.getForm();
    const { state, dispatch } = this;
    setLoading({ state, dispatch, value: true });
    return fetch(`${API_PATH}login`, {
      method: "POST",
      body: loginForm,
    })
      .then((res) => res.json())
      .then(({ error, message, token }) => {
        setLoading({ state, dispatch, value: false });
        setMessage({ dispatch, state, error, message });
        if (token) setAuth({ dispatch, state, token });
      });
  }

  logout() {
    const { dispatch, state } = this;
    clearAuth({ dispatch, state });
    setMessage({ dispatch, state, error: false, message: "Just logged out." });
  }

  store() {
    const form = this.getForm();
    const { state, dispatch } = this;
    setLoading({ state, dispatch, value: true });
    return fetch(`${API_PATH}${this.entity}`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then(({ message, error }) => {
        setLoading({ state, dispatch, value: false });
        if (message) setMessage({ dispatch, state, error, message });
        if (!error) this.reset();
        this.index();
      });
  }

  update() {
    const form = this.getForm();
    form.append("_method", "PUT");
    const { state, dispatch, entity } = this;
    state.json[entity] = state.json[entity] || {};
    const id = state.json[entity].id || 0;
    setLoading({ state, dispatch, value: true });
    return fetch(`${API_PATH}${this.entity}/${id}`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then(({ message, error }) => {
        setLoading({ state, dispatch, value: true });
        if (message) setMessage({ dispatch, state, error, message });
        this.index();
        this.reset();
      });
  }

  destroy(id) {
    if (!confirm("Do you want to proceed with this action?")) return;
    const form = this.getForm();
    form.append("_method", "DELETE");
    const { state, dispatch } = this;
    // const id = state.json.id || 0;
    setLoading({ state, dispatch, value: true });
    return fetch(`${API_PATH}${this.entity}/${id}`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then(({ message, error }) => {
        setLoading({ state, dispatch, value: true });
        if (message) setMessage({ dispatch, state, error, message });
        this.index();
      });
  }

  getUrlQueryParams() {
    //url_query
    const { entity, state, dispatch } = this;
    const params = state.url_query[entity] || {};
    var r = [];
    each(params, (item, key) => {
      r.push(`${key}=${item}`);
    });
    return `?${r.join("&")}`;
  }

  setUrlParam({ key, value }) {
    const { dispatch, state, entity } = this;
    console.log(key, value);
    setUrlQuery({ dispatch, state, store: entity, key, value });
  }

  index() {
    const { state, dispatch } = this;
    const id = state.json.id || 0;
    setLoading({ state, dispatch, value: true });
    console.log(`${API_PATH}${this.entity}`);
    return fetch(`${API_PATH}${this.entity}${this.getUrlQueryParams()}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setLoading({ state, dispatch, value: true });
        setData({ dispatch, state, key: this.entity, value: response });
        //   this.runHooks();
      });
  }

  reset() {
    const { dispatch, state, entity } = this;
    clearJson({ dispatch, state, store: entity });
  }
}
