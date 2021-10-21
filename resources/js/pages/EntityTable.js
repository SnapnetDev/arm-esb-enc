import { useContext, useEffect, useState } from "react";
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

export default function EntityTable({ match }) {
  const name = match.params.name;
  return <Layoutv2 title={`Entity (${name})`} match={match} component={component} />;
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

function component({ match }) {
  const tableId = match.params.id;
  const tableName = match.params.name;

  // alert(tableId);

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
    list: tableList,
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
    setShowUrl,
    setQueryUrl,
  } = useCrud({ resource: "table", startResource: "show", idParam: tableId });

  const [pagination, setPagination] = useState({ skip: 0, take: 11 });

  const nextPage = () => {
    let { skip, take } = pagination;
    skip += take;
    setPagination({ ...pagination, skip, take });
  };

  const prevPage = () => {
    let { skip, take } = pagination;
    skip -= take;
    setPagination({ ...pagination, skip, take });
  };

  useEffect(() => {
    let { skip, take } = pagination;
    setQueryUrl(`?skip=${skip}&take=${take}`);
  }, [pagination]);

  let { rec_count, list } = tableList;
  list = list || [];
  rec_count = rec_count || 0;
  //get fields
  // if (list.length <= 0){
  //     return (<i>Loading Schema... (Record Empty)</i>);
  // }

  let fields = list.length ? Object.keys(list[0]) : [];

  const PaginationButtons = () => {
    return (
      <div className="col-md-12" align="right" style={{ marginBottom: "7px" }}>
        <button onClick={prevPage} className="btn btn-sm btn-primary">
          Prev
        </button>
        &nbsp;
        <button onClick={nextPage} className="btn btn-sm btn-primary">
          Next
        </button>
      </div>
    );
  };

  // const {visible,bindOpenModal,triggerOpen} = useModalTrigger();

  return (
    <Row>
      <MessageLogger message={message} error={error} />
      <Loading loading={loading} />

      <Modal
        {...modalAttr()}
        title={`Entity (${tableName}) Definition Form`}
        bindAction={() => bindCreateUpdateButton({ textCreate: "...", textUpdate: "Preview" })}
      >
        <div className="col-md-12">
          {fields.map((field, key) => (
            <div key={key} className="form-group">
              <label>{field}</label>
              <input type="text" className="form-control" {...bindInput(field)} />
            </div>
          ))}
        </div>
      </Modal>

      {/* <div className="col-md-12" align="right" style={{marginBottom:'11px'}}>
          <button className="btn btn-sm btn-success" {...bindOpenModal()}>Add Source</button>
        </div> */}

      <Col col="12">
        <PaginationButtons />

        {list.length <= 0 ? <i>Loading Schema... (Record Empty)</i> : ""}

        <div className="table-responsive">
          <table className="table" style={{ backgroundColor: "#fff" }}>
            <thead>
              <tr>
                {fields.map((item, key) => (
                  <th key={key}>{item}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, key) => (
                <tr key={key}>
                  {fields.map((column, key2) => (
                    <td key={key2}>{item[column]}</td>
                  ))}

                  <td>
                    {/* {...bindSelectRowModal(item)} */}
                    <a {...bindSelectRowModal(item)} className="btn btn-sm btn-info">
                      Preview
                    </a>
                    {/* &nbsp; */}
                    {/* {...bindDeleteButton(item)} */}
                    {/* <a  className="btn btn-sm btn-danger">Remove</a> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-12">
          <small>
            Record - Count : <b>{rec_count}</b>
          </small>
        </div>

        <PaginationButtons />
      </Col>
      {/* <Col col="4" style={formStyle}>
        </Col> */}
    </Row>
  );
}
