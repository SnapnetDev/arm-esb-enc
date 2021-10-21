import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { doGet } from "../components/Hooks";
import { ApiSyncCard } from "../components/ApiSyncCard";
import { StoreSyncCard } from "../components/StoreSyncCard";
import { TableSyncCard } from "../components/TableSyncCard";
import { Resource } from "../utils/UI";

export const ApiSyncCollectionEmitters = () => {
  // const [response, setResponse] = useState([]);
  // const [loading, setLoading] = useState(true);
  const {data:response,loading,index} = useContext(Resource.Context);

  // useEffect(() => {
  //   doGet({ url: "api-sync", setLoading, setResponse });
  // }, []);
  useEffect(()=>{
    index();
  },[]);

  // console.log(response);

  if (loading) {
    return <div>Loading Emitters...</div>;
  }

  const ApiSyncEmitter = ({ data }) => {
    const { name, status } = data;

    return <ApiSyncCard data={data} status={status} syncLink="api-sync" />;
  };

  return (
    <>
      <h5 className="text-base sm:text-xl mb-10 mt-4">API - Sync (Activity Monitor)</h5>

      {response.map((data, key) => (
        <ApiSyncEmitter data={data} key={key} />
      ))}
    </>
  );
};

export const StoreSyncCollectionEmitters = () => {
  // const [response, setResponse] = useState([]);
  // const [loading, setLoading] = useState(true);

  const {data:response,loading,index} = useContext(Resource.Context);
  // console.log(response);
  useEffect(()=>{
    index();
  },[]);

  if (loading) {
    return <div>Loading Emitters...</div>;
  }

  const ApiSyncEmitter = ({ data }) => {
    const { name, status } = data;

    return <StoreSyncCard data={data} status={status} syncLink="store-sync" />;
  };

  return (
    <>
      <h5 className="text-base sm:text-xl mb-10">Store - Sync (Activity Monitor)</h5>
      {response.map((data, key) => (
        <ApiSyncEmitter data={data} key={key} />
      ))}
    </>
  );
};

export const TableSyncCollectionEmitters = () => {
  // const [response, setResponse] = useState([]);
  // const [loading, setLoading] = useState(true);

  const {data:response,loading,index} = useContext(Resource.Context);

  useEffect(()=>{
    index();
  },[]);

  // useEffect(() => {
  //   doGet({ url: "table-sync", setLoading, setResponse });
  // }, []);

  // console.log(response);

  if (loading) {
    return <div>Loading Emitters...</div>;
  }

  const ApiSyncEmitter = ({ data }) => {
    const { name, status } = data;

    return <TableSyncCard data={data} status={status} syncLink="table-sync" />;
  };

  return (
    <>
      <h5 className="text-base sm:text-xl mb-10 ">Table - Sync (Activity Monitor)</h5>

      {response.map((data, key) => (
        <ApiSyncEmitter data={data} key={key} />
      ))}
    </>
  );
};
