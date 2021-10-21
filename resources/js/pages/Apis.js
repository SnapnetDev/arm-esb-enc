import { useContext, useEffect, useState } from "react";
import ApiResponse from "../components/ApiResponse";
import ApiRunner from "../components/ApiRunner";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { doGet, useLaravelCrud, useSelectChange } from "../components/Hooks";
import { useCrud, useInputChange, useModalTrigger } from "../components/Hooksv2";
import { InputSelect, InputText, InputTextArea, StoreUpdateButton } from "../components/input-components/Input";
import { Layout } from "../components/layouts/Layout";
import { Layoutv2 } from "../components/layouts/Layoutv2";
import { Loading } from "../components/Loading";
import MessageLogger from "../components/MessageLogger";
// import { Modal } from "../components/Modal";
import Row from "../components/Row";
import { formStyle } from "./Credentials";

export default function Apis() {
  return <Layoutv2 title="Apis" component={component} />;
}

const style = {
  fontSize: "20px",
};

function component() {
  const {
    data,
    bindResetButton,
    reset,
    Modal,
    selectRow,
    setResource,
    setDestroyUrl,
    setIndexUrl: setIndexUrlApi,
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
    bindSelectRowModal,
    modalAttr,
    bindCreateUpdateButton,
    bindOpenModal,
    bindCreateUpdateButtonModal,
  } = useCrud({ resource: "api" });

  const { value, bindInputChange } = useInputChange();

  const { list: listCredential } = useCrud({ resource: "credential" });

  const {
    setIndexUrl: setIndexUrlCategory,
    list: listCategory,
    error: error2,
    message: message2,
    loading: loading2,
    reload: reloadCategory,
  } = useCrud({ resource: "category" });

  useEffect(() => {
    setIndexUrlApi("api?category_id=0");
  }, []);

  useEffect(() => {
    if (value) setIndexUrlApi(`api?category_id=${value}`);
  }, [value]);

  useEffect(() => {
    if (list.length) reloadCategory();
  }, [list]);

  const response_types = [
    {
      id: "json",
      value: "JSON",
    },
    {
      id: "text",
      value: "TEXT",
    },
  ];

  const methods = [
    {
      id: "POST",
      value: "POST",
    },
    {
      id: "GET",
      value: "GET",
    },
    {
      id: "PUT",
      value: "PUT",
    },
    {
      id: "DELETE",
      value: "DELETE",
    },
    {
      id: "PATCH",
      value: "PATCH",
    },
  ];

  useEffect(() => {
    // $('#myModal').modal();
  }, []);

  // const {visible,bindOpenModal,triggerOpen} = useModalTrigger();

  return (
    <Row>
      <MessageLogger message={message} error={error} />

      <Modal
        {...modalAttr()}
        large={true}
        title="API Form"
        bindAction={() =>
          bindCreateUpdateButtonModal({
            textUpdate: "Update API",
            textCreate: "Create API",
          })
        }
      >
        <div className="col-md-6">
          <div className="form-group">
            <label>Source System Name</label>
            <input type="text" className="form-control" {...bindInput("category_name")} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Select Source System</label>
            <select className="form-control" {...bindInput("category_id")}>
              <option value="0">--Select System---</option>
              {listCategory.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>API Name</label>
            <input type="text" className="form-control" {...bindInput("name")} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Select Credentials</label>
            <select className="form-control" {...bindInput("credential_id", "0")}>
              <option value="0">--Select Credential---</option>
              <option value="0">N/A</option>
              {listCredential.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Require API</label>
            <select className="form-control" {...bindInput("require_api_id", "0")}>
              <option value="0">--Select API---</option>
              <option value="0">N/A</option>
              {list.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>
              URL
              <span style={{ color: "#777" }}>&nbsp;(i.e $url = 'domain.api';)</span>
            </label>
            <input type="text" className="form-control" {...bindInput("url")} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>URL-Preview</label>
            <input type="text" className="form-control" {...bindInput("url_preview")} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Method</label>
            <select className="form-control" {...bindInput("method")}>
              <option value="0">--Select Method---</option>
              {methods.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>Payload</label>
            <textarea className="form-control" {...bindInput("payload")}></textarea>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>Request</label>
            <textarea className="form-control" {...bindInput("request")}></textarea>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>Response</label>
            <textarea className="form-control" {...bindInput("response")}></textarea>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>
              Pivot Expression
              <span style={{ color: "#777" }}>&nbsp;(i.e $response = self::getPassportToken($token))</span>
            </label>
            <textarea className="form-control" {...bindInput("pivot_expression")}></textarea>
            <div>
              <span style={{ color: "#777" }}>&nbsp;(Variables to consider here are $api, $response , $input )</span>
            </div>
          </div>
        </div>

        {/* duplicate_check_expression */}
        <div className="col-md-12">
          <div className="form-group">
            <label>
              Duplicate Check Expression
              <span style={{ color: "#777" }}>&nbsp;{`(i.e if ($condition){$skip=true})`}</span>
            </label>
            <textarea className="form-control" {...bindInput("duplicate_check_expression")}></textarea>
            <div></div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>Response Type</label>
            <select className="form-control" {...bindInput("response_type")}>
              <option value="" key={0}>
                --Select Response Type---
              </option>
              {response_types.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        {data.id ? (
          <div className="col-md-12">
            <ApiResponse apiId={data.id} />
          </div>
        ) : (
          ""
        )}

        <br />

        {/* pivot */}

        {/* <input type="button" className="btn btn-sm btn-success" {...bindCreateUpdateButton({textUpdate:'Update API',textCreate:'Create API'})} />         */}
      </Modal>

      <Col col="12">
        <Loading loading={loading} />

        {/* duplicate_check_credential_id , token_credential_id */}

        <div className="form-group col-md-3">
          <label>Select Category</label>
          <select {...bindInputChange()} className="form-control">
            <option value="0">--Filter By Category---</option>
            {listCategory.map((item, key) => (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12" align="right" style={{ marginBottom: "11px" }}>
          <button className="btn btn-sm btn-success" {...bindOpenModal()}>
            Add API
          </button>
        </div>

        <table className="table" style={formStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Method</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.url}</td>
                <td>{item.method}</td>
                <td style={{ textAlign: "right" }}>
                  <a className="btn btn-sm btn-info" {...bindSelectRowModal(item)}>
                    Preview
                  </a>
                  &nbsp;
                  <a className="btn btn-sm btn-danger" {...bindDeleteButton(item)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>

      {/* <Col col="4" style={formStyle}>
        </Col> */}
    </Row>
  );
}
