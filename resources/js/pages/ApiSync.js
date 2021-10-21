import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { doGet, useGet, useLaravelCrud, useSelectChange } from "../components/Hooks";
import { useCrud, useModalTrigger } from "../components/Hooksv2";
import { InputText, InputTextArea, StoreUpdateButton } from "../components/input-components/Input";
import { Layout } from "../components/layouts/Layout";
import { Layoutv2 } from "../components/layouts/Layoutv2";
import { Loading } from "../components/Loading";
import MessageLogger from "../components/MessageLogger";
import { Modal } from "../components/Modal";
import Row from "../components/Row";

export default function ApiSync() {
  return <Layoutv2 title="Api Sync" component={component} />;
}
// 'api_id'=>request('api_id'),
//             'store_id'=>request('store_id'),
//             'chunk_size'=>request('chunk_size'),
//             'pivot'=>request('pivot'),
//             'direction'=>request('direction'),
//             'field_map'=>request('field_map'),
//             'frequency_time'=>request('frequency_time'),
//             'status'=>10,
//             'recurring'=>request('recurring'),
//             'start_date_time'=>request('start_date_time')
const style = {
  fontSize: "20px",
};

export const formStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "10px",
  marginBottom: "11px",
};

const direction = [
  { id: "in", value: "IN" },
  { id: "out", value: "OUT" },
];

const recurring = [
  { id: 1, value: "ON" },
  { id: 0, value: "OFF" },
];

const frequency = [
  { id: "everyMinute", value: "EVERY MINUTE" },
  { id: "hourly", value: "HOURLY" },
  { id: "daily", value: "DAILY" },
  { id: "weekly", value: "WEEKLY" },
  { id: "monthly", value: "MONTHLY" },
  { id: "quarterly", value: "QUARTERLY" },
  { id: "yearly", value: "YEARLY" },
];

function component() {
  const { list, reset, loading, message, error, bindInput, bindSelectRow, bindDeleteButton, bindCreateUpdateButton } = useCrud({ resource: "api-sync" });
  const { list: storeList } = useCrud({ resource: "store" });
  const { list: apiList } = useCrud({ resource: "api" });
  const { visible, bindOpenModal, triggerOpen } = useModalTrigger();

  return (
    <Row>
      <MessageLogger message={message} error={error} />
      <Loading loading={loading} />

      <Modal
        large={true}
        show={visible}
        title="API - Sync Form"
        bindAction={(cb) => bindCreateUpdateButton({ textUpdate: "Save", textCreate: "Add API-Sync" }, cb)}
      >
        <div className="col-md-6">
          <div className="form-group">
            <label>Sync Name</label>
            <input type="text" className="form-control" {...bindInput("name")} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Select Store</label>
            <select className="form-control" {...bindInput("store_id")}>
              <option key={0} value="">
                --Select Store--
              </option>
              {storeList.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Select API</label>
            <select className="form-control" {...bindInput("api_id")}>
              <option key={0} value="">
                --Select API--
              </option>
              {apiList.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Pivot (type root , if no key is specified)</label>
            <input type="text" className="form-control" {...bindInput("pivot")} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Frequency</label>
            <select className="form-control" {...bindInput("frequency_time")}>
              <option key={0} value="">
                --Select Frequency--
              </option>
              {frequency.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Status</label>
            <select className="form-control" {...bindInput("status")}>
              <option key={0} value="">
                --Select Status--
              </option>
              {recurring.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>

      <Col col="12">
        <div className="col-md-12" align="right" style={{ marginBottom: "11px" }}>
          <button className="btn btn-sm btn-success" {...bindOpenModal(reset)}>
            Add API-Sync
          </button>
        </div>

        <table className="table" style={{ backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Direction</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, key) => (
              <tr key={key}>
                <td>{item.name}</td>
                <td>{item.direction}</td>
                <td>{item.status == 1 ? "Enabled" : "Disabled"}</td>
                <td>
                  <a {...bindSelectRow(item, triggerOpen)} className="btn btn-sm btn-info">
                    Preview
                  </a>
                  &nbsp;
                  <a {...bindDeleteButton(item)} className="btn btn-sm btn-danger">
                    Remove API-Sync
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
