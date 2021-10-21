import { useEffect,useContext, useState } from "react";
import {Resource} from '../utils/UI';
import { If } from "./Utils";

export default function EntityBuilder({ source, mode = "create" }) {
  
  //mode (create , add , remove , locked)
  //lot_num:string:none,
  //field:data_type:modifier

  const {input,updateData} = useContext(Resource.Context); 
  let data = input[source] || '';
  const setData =(vl)=>updateData(source,vl);

  const [tableConfig, setTableConfig] = useState([]);
  const [index, setIndex] = useState(0);

  const defaultData = { field: "field_name", data_type: "string", modifier: "none" };
  const [data_, setData_] = useState(defaultData);

  const addConfig = ({ field, data_type, modifier }) => {
    console.log(tableConfig,'TC');
    console.log({ field, data_type, modifier },'TD');
    setTableConfig([...tableConfig, { field, data_type, modifier }]);
    // console.log([...tableConfig, { field, data_type, modifier }]);
  };

  const doAddConfig = () => {
    let { field, data_type, modifier } = data_;
    addConfig({ field, data_type, modifier });
    setData_(defaultData);
    setData(toOutString({ field, data_type, modifier }));
  };

  const doUpdate = () => {};

  const selectRow = (index_) => {
    setIndex(index_);
    let dt = tableConfig[index_];
    setData_(dt);
  };

  const dataToString = (dt) => {
    let { field, data_type, modifier } = dt;
    let r = [];
    r.push(field);
    r.push(data_type);
    r.push(modifier);
    return r.join(":");
  };

  const toOutString = ($data) => {
    let r = [];
    for (var i in tableConfig) {
      if (tableConfig.hasOwnProperty(i)) {
        let innerData = tableConfig[i];
        r.push(dataToString(innerData));
      }
    }
    r.push(dataToString($data));
    return r.join(",");
  };

  const bindInput = (source) => {
    return {
      value: data_[source] || "",
      onChange: (e) => {
        setData_({ ...data_, [source]: e.target.value });
      },
    };
  };

  // console.log('Data<:::>',data);

  useEffect(() => {
    console.log(data, "<--->Data...");
    let list = [];
    setTableConfig([]); ///reset this entry first
    data.split(",").forEach((item, key) => {
      console.log(item);
      let [field, data_type, modifier] = item.split(":");
      if (!field)return;
      console.log(field, data_type, modifier);
      list = [...list, { field, data_type, modifier }];
      // addConfig({field,data_type,modifier});
    });

    setTableConfig(list);

  }, [data]);

  const RenderTableContent = () => {
    return tableConfig.map((item, key) => (
      <tr key={key} className="border-b">
        <td className="px-6 py-6">{item.field}</td>
        <td className="px-6 py-6">{item.data_type}</td>
        <td className="px-6 py-6">{item.modifier}</td>
        <td className="px-6 py-6">
          {/* <button onClick={()=>selectRow(key)} type="button">Edit</button> */}
          {/* &nbsp; */}
          <If expression={mode != "locked"}>
            <button className=" text-sm text-red-600 hover:text-red-400" type="button">
              Remove
            </button>
          </If>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table-auto text-xs overflow-y-scroll w-full">
        <thead className="uppercase text-sm text-left border-b">
          <tr className="h-14">
            <th className="font-normal px-6 py-6">Field</th>
            <th className="font-normal px-6 py-6">Type</th>
            <th className="font-normal px-6 py-6">Modifier</th>
            <th className="font-normal px-6 py-6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs border-b">
          <RenderTableContent />
        </tbody>
      </table>
      <If expression={mode != "locked"}>
        <div className="">
          <div className="flex justify-between gap-x-2 mt-3">
            <EntityFieldName bindInput={bindInput} source="field" />
            <DataTypes bindInput={bindInput} source="data_type" />
            <Modifiers bindInput={bindInput} source="modifier" />
            <button className=" btn btn-outline border-french-violet-1 text-french-violet-1 text-xs capitalize font-normal" onClick={doAddConfig}>
              Add
            </button>
          </div>
        </div>
      </If>
    </>
  );
}

const Modifiers = ({ bindInput, source }) => {
  const modifiers = [
    { text: "none", value: "none" },
    { text: "unique", value: "unique" },
  ];
  const RenderModifiers = () => {
    return modifiers.map((item, key) => (
      <option key={key} value={item.value}>
        {item.text}
      </option>
    ));
  };

  return (
    <>
      <div className="form-control w-80">
        <select {...bindInput(source)} className="select select-bordered w-full text-xs font-light">
          <option value="">--Modifier--</option>
          <RenderModifiers />
        </select>
      </div>
    </>
  );
};

const DataTypes = ({ bindInput, source }) => {
  const data_types = [
    { text: "string", value: "string" },
    { text: "integer", value: "integer" },
    { text: "text", value: "text" },
    { text: "longText", value: "longText" },
  ];
  const RenderModifiers = () => {
    return data_types.map((item, key) => (
      <option key={key} value={item.value}>
        {item.text}
      </option>
    ));
  };

  return (
    <>
      <div className="form-control w-80">
        <select {...bindInput(source)} className="select select-bordered w-full text-xs font-light">
          <option value="">--Data-Type--</option>
          <RenderModifiers />
        </select>
      </div>
    </>
  );
};

const EntityFieldName = ({ bindInput, source }) => {
  return (
    <>
      <div className="form-control w-80">
        <input className="input input-bordered text-gray-700 font-light text-xs w-full" type="text" {...bindInput(source)} placeholder="Field Name" />
      </div>
    </>
  );
};
