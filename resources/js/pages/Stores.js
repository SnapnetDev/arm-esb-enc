import { useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { useLaravelCrud } from "../components/Hooks";
import { useCrud } from "../components/Hooksv2";
import { InputText, InputTextArea, StoreUpdateButton } from "../components/input-components/Input";
import { Layout } from "../components/layouts/Layout";
import { Layoutv2 } from "../components/layouts/Layoutv2";
import MessageLogger from "../components/MessageLogger";
import Row from "../components/Row";

export default function Stores() {
  return <Layoutv2 title="Stores" component={component} />;
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
  // const {EntryText,list,SelectRow,CrudButton,data,updateData,EntryTextArea,RemoveRow,message,error} = useLaravelCrud({entity:'store'});
  const {
    bindInput,
    list,
    message,
    error,
    bindSelectRow,
    bindDeleteButton,
    bindCreateUpdateButton,
    Modal,
    bindCreateUpdateButtonModal,
    bindSelectRowModal,
    modalAttr,
    bindOpenModal,
  } = useCrud({ resource: "store" });

  return (
    <Row>
      <MessageLogger message={message} error={error} />

      <Modal {...modalAttr()} title="Store" bindAction={() => bindCreateUpdateButtonModal({ textCreate: "Add", textUpdate: "Save" })}>
        <div className="col-md-12">
          <div className="form-group">
            <label>Store Name</label>
            <input type="text" {...bindInput("name")} className="form-control" />
          </div>
        </div>
      </Modal>

      <Col col="12">
        <div className="col-md-12" align="right" style={{ marginBottom: "5px" }}>
          <button className="btn btn-sm btn-success" {...bindOpenModal()}>
            Add Store
          </button>
        </div>

        <table className="table" style={{ backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Bytes Read</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.bytes}</td>

                <td>
                  <a className="btn btn-sm btn-info" {...bindSelectRowModal(item)}>
                    Preview.
                  </a>
                  &nbsp;
                  <a className="btn btn-sm btn-danger" {...bindDeleteButton(item)}>
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
  );
}
