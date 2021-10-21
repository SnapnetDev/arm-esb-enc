import { useCrud } from "./Hooksv2";
import { Layout } from "./layouts/Layout";
import { Layoutv2 } from "./layouts/Layoutv2";
import { ApiSyncCollectionEmitters, ApiSyncEmitter, StoreSyncCollectionEmitters, TableSyncCollectionEmitters } from "../pages/DashboardComponents";
import { Resource } from "../utils/UI";
import { API_PATH } from "./Config";

export default function Dashboard() {
  return <Layoutv2 title="Dashboard" component={component} />;
}

function component() {
  // const { list: apiList } = useCrud({ resource: "api" });
  // const { list: credentialList } = useCrud({ resource: "credential" });
  // const { list: storeList } = useCrud({ resource: "store" });
  // const { list: tableList } = useCrud({ resource: "table" });

  return (
    <div className="">
      <Resource.Container baseapi={API_PATH} resource="api-sync">
         <ApiSyncCollectionEmitters />
      </Resource.Container>
      <br />
      <Resource.Container baseapi={API_PATH} resource="store-sync">
      <StoreSyncCollectionEmitters />
      </Resource.Container>
      <br />
      <Resource.Container baseapi={API_PATH} resource="table-sync">
        <TableSyncCollectionEmitters />
      </Resource.Container>
    </div>
  );
}
