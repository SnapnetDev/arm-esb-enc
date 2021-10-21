import { useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { useGet, useLaravelCrud } from "../components/Hooks";
import { useCrud, useModalTrigger } from "../components/Hooksv2";
import { InputText, InputTextArea, StoreUpdateButton } from "../components/input-components/Input";
import { Layout } from "../components/layouts/Layout";
import { Layoutv2 } from "../components/layouts/Layoutv2";
import MessageLogger from "../components/MessageLogger";
// import { Modal } from "../Modal";
import Row from "../components/Row";

export default function Credentials() {
  return <Layoutv2 title="Credentials" component={component} />;
}

const style = {
  fontSize: "20px",
};

export const formStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "10px",
  marginBottom: "11px",
};

function component() {
  // const {EntryText,list,SelectRow,CrudButton,data,updateData,EntryTextArea,RemoveRow,message,error} = useLaravelCrud({entity:'credential'});

  const {
    data,
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
    reset,
    Modal,
    modalAttr,
    bindCreateUpdateButtonModal,
    bindSelectRowModal,
    bindOpenModal,
  } = useCrud({ resource: "credential" });

  // const {visible,bindOpenModal,triggerOpen} = useModalTrigger();

  return (
    <Row>
      <MessageLogger message={message} error={error} />
      <Modal {...modalAttr()} title="Credential Form" bindAction={() => bindCreateUpdateButton({ textCreate: "Add", textUpdate: "Save" })}>
        <div className="col-md-12">
          <div className="form-group">
            <label>Credential Name</label>
            <input type="text" className="form-control" {...bindInput("name")} />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Headers</label>
            <textarea className="form-control" {...bindInput("headers")}></textarea>
            <br />
            {/* <input type="button" className="btn btn-sm btn-success" {...bindCreateUpdateButton({textCreate:'Add Credential',textUpdate:'Update Credential'}) } /> */}
          </div>
        </div>
      </Modal>

      <div className="col-md-12" align="right" style={{ marginBottom: "11px" }}>
        <button className="btn btn-sm btn-success" {...bindOpenModal()}>
          Add Credential
        </button>
      </div>

      <Col col="12">
        <table className="table" style={{ backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Headers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.headers}</td>
                <td>
                  <a {...bindSelectRowModal(item)} className="btn btn-sm btn-info">
                    Preview
                  </a>
                  &nbsp;
                  <a {...bindDeleteButton(item)} className="btn btn-sm btn-danger">
                    Remove
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
