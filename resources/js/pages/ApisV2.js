import React, { useContext, useEffect, useState } from "react";
import ApiResponseV2 from "../components/ApiResponseV2";
import { API_PATH } from "../components/Config";
import { useCrud, useInputChange, useModalTrigger } from "../components/Hooksv2";
import { TSelectInput, TButton, TinputText, TtextArea } from "../components/input-components/InputV2";
import { Layoutv2, Layoutv3 } from "../components/layouts/Layoutv2";
import MessageLogger from "../components/MessageLogger";
import { ModalContainer, ModalContent, ModalRegion, ModalTailContext } from "../components/ModalTail";
// import { Modal } from "../components/Modal";
import { Resource } from "../utils/UI";

const InnerContext = React.createContext({});
export default function ApisV2() {
  //const result = useCrud({ resource: "api" });
  return (<Layoutv3 title="APIs">
    <Resource.Container resource="api" baseapi={API_PATH}>
       
       <Resource.MessageLog />

       <Resource.CreateModal title="Add API" width={"w-9/12"} height="max-h-full">
       <div className="space-y-4">
          <div className="flex flex-wrap justify-start gap-4">
            <Resource.Input width="w-72" label="Category Name." source="category_name" />
            <Resource.InputSelectData  width="w-72" resource="category" label="Source System" source="category_id" value="id" text="name">
              <option value="">--Select--</option>
              <option value="0">N/A</option>
            </Resource.InputSelectData>
            <Resource.Input  width="w-72" label="API Name" source="name" />
            <Resource.InputSelectData  width="w-72" resource="credential" label="Credential" source="credential_id" value="id" text="name">
              <option value="">--Select--</option>
              <option value="0">N/A</option>
            </Resource.InputSelectData>
            <Resource.InputSelectData  width="w-72" resource="api" label="Base API" source="require_api_id" value="id" text="name">
              <option value="">--Select--</option>
              <option value="0">N/A</option>
            </Resource.InputSelectData>
            <Resource.Input  width="w-72" label="URL" source="url" />
            <Resource.Input  width="w-72" label="URL-Preview" source="url_preview" />
            <Resource.InputSelectDummy  width="w-72" resource="api" label="HTTP-Method" source="method">
              <option value="">--Select--</option>
              <option value="POST">POST</option>
              <option value="GET">GET</option>
              <option value="PATCH">PATCH</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </Resource.InputSelectDummy>
            <Resource.InputSelectDummy  width="w-72" resource="api" label="Response Type" source="response_type">
              <option value="">--Select--</option>
              <option value="json">JSON</option>
              <option value="text">TEXT</option>
            </Resource.InputSelectDummy>
            {/* <TtextArea width={"w-72"} label={"Payload"} {...bindInput("payload")} /> */}
            <Resource.InputTextArea  width="w-full" label="Payload" source="payload" />
            <Resource.InputTextArea  width="w-full" label="Request" source="request" />
            <Resource.InputTextArea  width="w-full" label="Response" source="response" />
            <Resource.InputTextArea  width="w-full" label="Expression" source="expression" />
          </div>
          <div className="flex space-x-4">
          <Resource.Button>
              Add 
          </Resource.Button>
          <Resource.ButtonCloseModal>
              Close
          </Resource.ButtonCloseModal>
          </div>
        </div>
       </Resource.CreateModal>

       <Resource.EditModal title="Edit API" width={"w-9/12"} height="max-h-full">
       <div className="space-y-4">
          <div className="flex flex-wrap justify-start gap-4">
            <Resource.Input width="w-72" label="Category Name." source="category_name" />
            <Resource.InputSelectData  width="w-72" resource="category" label="Source System" source="category_id" value="id" text="name">
              <option value="">--Select--</option>
              <option value="0">N/A</option>
            </Resource.InputSelectData>
            <Resource.Input  width="w-72" label="API Name" source="name" />
            <Resource.InputSelectData  width="w-72" resource="credential" label="Credential" source="credential_id" value="id" text="name">
              <option value="">--Select--</option>
              <option value="0">N/A</option>
            </Resource.InputSelectData>
            <Resource.InputSelectData  width="w-72" resource="api" label="Base API" source="require_api_id" value="id" text="name">
              <option value="">--Select--</option>
              <option value="0">N/A</option>
            </Resource.InputSelectData>
            <Resource.Input  width="w-72" label="URL" source="url" />
            <Resource.Input  width="w-72" label="URL-Preview" source="url_preview" />
            <Resource.InputSelectDummy  width="w-72" resource="api" label="HTTP-Method" source="method">
              <option value="">--Select--</option>
              <option value="POST">POST</option>
              <option value="GET">GET</option>
              <option value="PATCH">PATCH</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </Resource.InputSelectDummy>
            <Resource.InputSelectDummy width="w-72" resource="api" label="Response Type" source="response_type">
              <option value="">--Select--</option>
              <option value="json">JSON</option>
              <option value="text">TEXT</option>
            </Resource.InputSelectDummy>
            {/* <TtextArea width={"w-72"} label={"Payload"} {...bindInput("payload")} /> */}
            <Resource.InputTextArea  width="w-full" label="Payload" source="payload" />
            <Resource.InputTextArea  width="w-full" label="Request" source="request" />
            <Resource.InputTextArea  width="w-full" label="Response" source="response" />
            <Resource.InputTextArea  width="w-full" label="Expression" source="expression" />

            <ApiResponseV2  />
            
          </div>
          <div className="flex space-x-4">
          <Resource.EditButton>
              Update 
          </Resource.EditButton>
          <Resource.ButtonCloseModal>
              Close
          </Resource.ButtonCloseModal>
          </div>
        </div>
       </Resource.EditModal>



       <div className="mr-2 overflow-x-scroll">

       <div className="flex mt-2 justify-between items-center space-x-6 flex-shrink-0">
        <h5 className="text-base sm:text-xl flex-1">APIs</h5>

          <Resource.InputSelectDataTrigger 
             
             label="Filter By Source System" 
             source="category_id" 
             resource="category" 
             baseapi={API_PATH} 

          />

          <Resource.AddButton>
            Add API
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
                URL
              </Resource.Th>
              <Resource.Th>
                Method
              </Resource.Th>
              <Resource.Th>
                Actions
              </Resource.Th>

          </Resource.Thead>   

          <Resource.Tbody>
            <Resource.Tr>
               <Resource.Td source="name" />
               <Resource.Td source="url" />
               <Resource.Td source="method" />
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
