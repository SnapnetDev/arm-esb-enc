import { useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { useGet, useLaravelCrud } from "../components/Hooks";
import { useCrud, useModalTrigger } from "../components/Hooksv2";
import { InputText, InputTextArea, StoreUpdateButton } from "../components/input-components/Input";
import { Layout } from "../components/layouts/Layout";
import MessageLogger from "../components/MessageLogger";
// import { Modal } from "../Modal";
import Row from "../components/Row";
import { Loading } from "../components/Loading";
import { Layoutv2 } from "../components/layouts/Layoutv2";
// import { Modal } from "../Modal";

export default function Categories() {
  return <Layoutv2 title="Categories (Source Systems)" component={component} />;
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
    bindOpenModal,
    modalAttr,
    Modal,
    bindSelectRowModal,
    bindCreateUpdateButtonModal,
  } = useCrud({ resource: "category" });

  // const {visible,bindOpenModal,triggerOpen} = useModalTrigger();

  return (
    <Row>
      <MessageLogger message={message} error={error} />
      <Loading loading={loading} />

      <Modal {...modalAttr()} title="Source System Form" bindAction={() => bindCreateUpdateButton({ textCreate: "Add", textUpdate: "Save" })}>
        <div className="form-group">
          <label>Source System Name</label>
          <input type="text" className="form-control" {...bindInput("name")} />
        </div>
      </Modal>

      <div className="col-md-12" align="right" style={{ marginBottom: "11px" }}>
        <button className="btn btn-sm btn-success" {...bindOpenModal()}>
          Add Source
        </button>
      </div>

      <Col col="12">
        <table className="table" style={{ backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>

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
