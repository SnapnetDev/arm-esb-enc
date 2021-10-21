import React, { useContext, useEffect } from "react";
import { Layoutv2, Layoutv3 } from "../components/layouts/Layoutv2";
import { ModalContainer, ModalContent, ModalRegion, ModalTailContext } from "../components/ModalTail";
import { TinputText, TButton } from "../components/input-components/InputV2";
import { Resource } from "../utils/UI";
import { API_PATH } from "../components/Config";

const InnerContext = React.createContext({});
export default function StoresV2() {
  // const result = useCrud({ resource: "store" });
  return (
    <Layoutv3 title="Stores">
    <Resource.Container baseapi={API_PATH} resource="store">

      {/* log messages */}
      <Resource.MessageLog />

     <Resource.CreateModal title="Create Store">

     <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <Resource.Input label="Store Name" source="name" />
          {/* <Resource.Input label="Headers" source="headers" /> */}
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

     <Resource.EditModal title="Edit Store">

     <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <Resource.Input label="Store Name" source="name" />
          {/* <Resource.Input label="Headers" source="headers" /> */}
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
        <h5 className="text-base sm:text-xl">Stores</h5>
        <Resource.AddButton>
          Add Store
        </Resource.AddButton>
      </div>
      <div className="mt-10 bg-white">

      {/* table start */}
      <Resource.Table>

        <Resource.Thead>
            <Resource.Th>
              Name 
            </Resource.Th>
            {/* <Resource.Th>
              Headers
            </Resource.Th> */}
            <Resource.Th>
              Actions
            </Resource.Th>

        </Resource.Thead>   

        <Resource.Tbody>
          <Resource.Tr>
             <Resource.Td source="name" />
             {/* <Resource.Td source="headers" /> */}
             <td className="flex px-3 space-x-2 space-y-2">
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
  </Layoutv3>
    );
}