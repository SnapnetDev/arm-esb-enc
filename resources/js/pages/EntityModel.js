import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { useLaravelCrud } from "../components/Hooks";
import { useCrud } from "../components/Hooksv2";
import { InputText, InputTextArea, StoreUpdateButton } from "../components/input-components/Input";
import { Layout } from "../components/layouts/Layout";
import { Layoutv2 } from "../components/layouts/Layoutv2";
import { Loading } from "../components/Loading";
import MessageLogger from "../components/MessageLogger";
import Row from "../components/Row";

export default function EntityModel() {
  return <Layoutv2 title="Entities" component={component} />;
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
  // const {EntryText,list,SelectRow,CrudButton,data,updateData,EntryTextArea,RemoveRow,message,error} = useLaravelCrud({entity:'table'});
  const {
    list,
    loading,
    message,
    error,
    bindInput,
    bindCreateUpdateButton,
    bindSelectRow,
    bindDeleteButton,
    data,
    bindOpenModal,
    modalAttr,
    bindSelectRowModal,
    bindCreateUpdateButtonModal,
    Modal,
  } = useCrud({ resource: "table" });

  // const {state,dispatch} = useContext(AppContext);
  // const entityStore = new Entity({entity:'store',state,dispatch});
  // useEffect(()=>{
  //     entityStore.reset();
  // },[]);
  // style={formStyle}
  return (
    <Row>
      <MessageLogger message={message} error={error} />
      <Modal {...modalAttr()} title="Entity Form" bindAction={() => bindCreateUpdateButtonModal({ textUpdate: "Save", textCreate: "Add" })}>
        <div className="col-md-12">
          <div className="form-group">
            <label>Name Of Entity</label>
            <input type="text" className="form-control" {...bindInput("name")} />
          </div>
          <div className="form-group">
            <label>Alias</label>
            <input type="text" className="form-control" {...bindInput("alias")} />
          </div>
          <div className="form-group">
            <label>Fields (Comma seperated list in format field:type:modifier)</label>
            <textarea type="text" className="form-control" {...bindInput("fields")}></textarea>
            <label>(Available types include: text,string,integer,longText , then for modifiers (unique,none))</label>
          </div>

          {data.id ? (
            <span>
              <div className="form-group">
                <label
                  style={{
                    color: "orange",
                  }}
                >
                  Fields Add (Comma seperated list)
                </label>
                <textarea type="text" className="form-control" {...bindInput("fields_add")}></textarea>
              </div>

              <div className="form-group">
                <label
                  style={{
                    color: "red",
                  }}
                >
                  Fields Remove(Comma seperated list)
                </label>
                <textarea type="text" className="form-control" {...bindInput("fields_remove")}></textarea>
              </div>
            </span>
          ) : (
            ""
          )}
        </div>
      </Modal>
      <div className="col-md-12">
        <Loading loading={loading} />
      </div>
      <Col col="12">
        <div className="col-md-12" align="right" style={{ marginBottom: "5px" }}>
          <button className="btn btn-sm btn-success" {...bindOpenModal()}>
            Add
          </button>
        </div>

        <table className="table" style={{ backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Alias</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, key) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.alias}</td>

                <td>
                  <a className="btn btn-sm btn-info" {...bindSelectRowModal(item)}>
                    Preview
                  </a>
                  &nbsp;
                  <NavLink to={`entity/${item.id}/${item.name}`} className="btn btn-sm btn-primary">
                    View Entity
                  </NavLink>
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
