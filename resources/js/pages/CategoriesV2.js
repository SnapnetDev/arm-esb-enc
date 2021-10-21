import React from "react";
import { Layoutv3 } from "../components/layouts/Layoutv2";
import { Resource } from "../utils/UI";
import { API_PATH } from "../components/Config";

export default function CategoriesV2() {
  return (
    <Layoutv3 title="Credentials">
    <Resource.Container baseapi={API_PATH} resource="category">

      {/* log messages */}
      <Resource.MessageLog />

     <Resource.CreateModal title="Create Category">

     <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <Resource.Input label="Credential Name" source="name" />
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

     <Resource.EditModal title="Edit Category">

     <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <Resource.Input label="Credential Name" source="name" />
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
        <h5 className="text-base sm:text-xl">Categories</h5>
        <Resource.AddButton>
          Add Category
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
  </Layoutv3>);

}
