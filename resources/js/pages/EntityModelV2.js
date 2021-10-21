import React, { useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext";
import Col from "../components/Col";
import { Entity } from "../components/Entity";
import { apiFetch, TableData } from "../components/Helpers";
import { useGet, useLaravelCrud } from "../components/Hooks";
import { useCrud, useModalTrigger } from "../components/Hooksv2";
import MessageLogger from "../components/MessageLogger";
// import { Modal } from "../Modal";
import Row from "../components/Row";
import { Loading } from "../components/Loading";
import { Layoutv2, Layoutv3 } from "../components/layouts/Layoutv2";
import { TinputText, TButton, TtextArea } from "../components/input-components/InputV2";
import { ModalContainer, ModalContent, ModalRegion, ModalTailContext } from "../components/ModalTail";
import { NavLink } from "react-router-dom";
import EntityBuilder from "../components/EntityBuilder";
import { If } from "../components/Utils";
import { Resource } from "../utils/UI";
import { API_PATH } from "../components/Config";

// import { Modal } from "../Modal";

const InnerContext = React.createContext({});
export default function EntityModelV2() {
  const result = useCrud({ resource: "table" });

  return (
    <Layoutv3 title="Entities">
      <Resource.Container baseapi={API_PATH} resource="table">

        {/* log messages */}
        <Resource.MessageLog />

       <Resource.CreateModal title="Create Entity" width={"w-9/12"} height="max-h-full">

       <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Resource.Input label="Entity Name" source="name" />
            <Resource.Input label="Alias" source="alias" />
            <div>
                <div>
                  <label>Fields Add</label>
                </div>
                <EntityBuilder source="fields" mode="add" />
            </div>
            
            {/* <Resource.InputSelectData resource="credential" label="Cred-List" source="crd_id" value="id" text="name" /> */}
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

       <Resource.EditModal title="Edit Entity" width={"w-9/12"} height="max-h-full">

       <div className="space-y-4">
          <div className="flex flex-col gap-4">
            <Resource.Input label="Entity Name" source="name" />
            <Resource.Input label="Alias" source="alias" />
            <div>
                <div>
                  <label>Fields</label>
                </div>
                <EntityBuilder source="fields" mode="locked" />
            </div>
            <div>
                <div>
                  <label>Fields Remove</label>
                </div>
                <EntityBuilder source="fields_remove" mode="add" />
            </div>
            <div>
                <div>
                  <label>Fields Add</label>
                </div>
                <EntityBuilder source="fields_add" mode="add" />
            </div>
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
          <h5 className="text-base sm:text-xl">Entities</h5>
          <Resource.AddButton>
            Add Entity
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
                Actions
              </Resource.Th>
          </Resource.Thead>   

          <Resource.Tbody>
            <Resource.Tr>
               <Resource.Td source="name" />
               <td className="flex px-3 space-x-2">
               {/* <div class="btn-group"> */}

               <Resource.TdPreviewButton />
               {/* className="btn btn-outline btn-xs" */}
                 <Resource.TdLink to={(data)=>`/entity/${data.id}/${data.name}`} className="py-2">
                   <i className="ri-eye-line hover:text-gun-metal-3 text-lg inline-block align-middle mr-1 mb-1"></i>
                   View Entity
                 </Resource.TdLink>
                 <Resource.TdDeleteButton source="id" />

  {/* <button class="btn btn-outline btn-xs btn-active">Large</button> 
  <button class="btn btn-outline btn-xs">Large</button> 
  <button class="btn btn-outline btn-xs">Large</button> */}

  {/* </div> */}
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
