import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { doGet, useGet, useLaravelCrud, useSelectChange } from "../components/Hooks";
import { useCrud, useModalTrigger } from "../components/Hooksv2";
import { InputText, InputTextArea, StoreUpdateButton } from "../components/input-components/Input";
import { Layoutv2, Layoutv3 } from "../components/layouts/Layoutv2";
import { Loading } from "../components/Loading";
import { TButton, TinputText, TSelectInput, TtextArea } from "../components/input-components/InputV2";
import MessageLogger from "../components/MessageLogger";
import { ModalContainer, ModalContent, ModalRegion, ModalTailContext } from "../components/ModalTail";
import { Resource } from "../utils/UI";
import { API_PATH } from "../components/Config";

const InnerContext = React.createContext({});
export default function TableSyncV2() {
  const result = useCrud({ resource: "table-sync" });

  return (
   
<Layoutv3 title="Store Sync">
    <Resource.Container baseapi={API_PATH} resource="table-sync">
      {/* log messages */}
      <Resource.MessageLog />

      {/* width={"w-9/12"} */}
     <Resource.CreateModal title="Create Table Sync" height="max-h-full">

     <div className="space-y-4">
        <div className="flex flex-col justify-start gap-4">
          <Resource.Input label="Table Sync Name" source="name" />
          <Resource.InputSelectData label="Select Table/Model" source="table_id" resource="table" baseapi={API_PATH} value="id" text="name">
            <option value="">--Select--</option>
          </Resource.InputSelectData>
          <Resource.InputSelectData label="Select API" source="api_id" resource="api" baseapi={API_PATH} value="id" text="name">
            <option value="">--Select--</option>
          </Resource.InputSelectData>
          <Resource.Input label="Tracker Name" source="tracker_name" />
          <Resource.Input label="Tracker Reset Value" source="tracker_reset_value" />
          <Resource.Input label="Chunk Size" source="chunk_size" />
          <Resource.InputSelectDummy label="Frequency" source="frequency_time">
            <option value="">--Select--</option>
            <option value="everyMinute">EVERY MINUTE</option>
            <option value="hourly">HOURLY</option>
            <option value="daily">DAILY</option>
            <option value="weekly">WEEKLY</option>
            <option value="monthly">MONTHLY</option>
            <option value="quarterly">QUARTERLY</option>
            <option value="yearly">YEARLY</option>
          </Resource.InputSelectDummy>
          <Resource.InputSelectDummy label="Status" source="status">
            <option value="">--Select--</option>
            <option value="0">Inactive</option>
            <option value="1">Active</option>
          </Resource.InputSelectDummy>
        </div>
        <div className="flex space-x-4">
        <Resource.Button>
            Add 
        </Resource.Button>
        {/* <Resource.Button>
            Add 
        </Resource.Button> */}
        </div>
      </div>

     </Resource.CreateModal> 

     <Resource.EditModal title="Edit Table Sync" height="max-h-full">

     <div className="space-y-4">
        <div className="flex flex-col gap-4">
        <Resource.Input label="Table Sync Name" source="name" />
          <Resource.InputSelectData label="Select Table/Model" source="table_id" resource="table" baseapi={API_PATH} value="id" text="name">
            <option value="">--Select--</option>
          </Resource.InputSelectData>
          <Resource.InputSelectData label="Select API" source="api_id" resource="api" baseapi={API_PATH} value="id" text="name">
            <option value="">--Select--</option>
          </Resource.InputSelectData>
          <Resource.Input label="Tracker Name" source="tracker_name" />
          <Resource.Input label="Tracker Reset Value" source="tracker_reset_value" />
          <Resource.Input label="Chunk Size" source="chunk_size" />
          <Resource.InputSelectDummy label="Frequency" source="frequency_time">
            <option value="">--Select--</option>
            <option value="everyMinute">EVERY MINUTE</option>
            <option value="hourly">HOURLY</option>
            <option value="daily">DAILY</option>
            <option value="weekly">WEEKLY</option>
            <option value="monthly">MONTHLY</option>
            <option value="quarterly">QUARTERLY</option>
            <option value="yearly">YEARLY</option>
          </Resource.InputSelectDummy>
          <Resource.InputSelectDummy label="Status" source="status">
            <option value="">--Select--</option>
            <option value="0">Inactive</option>
            <option value="1">Active</option>
          </Resource.InputSelectDummy>
        </div>
        <div className="flex space-x-4">
        <Resource.EditButton>
            Update
        </Resource.EditButton>
        {/* <Resource.Button>
            Add 
        </Resource.Button> */}
        </div>
      </div>

     </Resource.EditModal> 


    <div className="mr-2 overflow-x-scroll">
      <div className="flex mt-2 justify-between items-center">
        <h5 className="text-base sm:text-xl">Table Sync</h5>
        <Resource.AddButton>
          Add Table Sync
        </Resource.AddButton>
      </div>
      <div className="mt-10 bg-white">

      {/* table start */}
      <Resource.Table>

        <Resource.Thead>
            <Resource.Th>
              Name 
            </Resource.Th>
            <Resource.Th>
              Status
            </Resource.Th>
            <Resource.Th>
              Actions
            </Resource.Th>

        </Resource.Thead>   

        <Resource.Tbody>
          <Resource.Tr>
             <Resource.Td source="name" />
             <Resource.Td source="status" />
             <td className="flex px-3 space-x-2 items-center">
               <Resource.TdPreviewButton />
               <Resource.TdDeleteButton source="id" />
             </td>
          </Resource.Tr>
        </Resource.Tbody>

      </Resource.Table>
      {/* table stop */}

      </div>
    </div>
    
    </Resource.Container>
  </Layoutv3>);
}
