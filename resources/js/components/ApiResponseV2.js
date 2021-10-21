import { useContext, useEffect } from "react";
import { Resource } from "../utils/UI";
import { API_PATH } from "./Config";
import { useAjaxCall } from "./Hooksv2";

export default function ApiResponseV2() {

  const {input} = useContext(Resource.Context);

  let apiId = input.id || 0;

  const { loading, response, callResource, bindAjaxTrigger } = useAjaxCall({
    url: `${API_PATH}api-run/${apiId}`,
    method: "GET",
  });
  let list = response;

  useEffect(() => {
    list = response;
  }, [response]);
  return (
    <div>
      {response ? (
        <div className="mt-4">
          {loading ? <i>Waiting For Response...</i> : ""}
          <table className="table-auto w-full overflow-x-scroll bg-white">
            <thead className="uppercase text-sm text-left border-b">
              <tr className=" h-5">
                <th className=" font-normal w-1/5 px-3 py-3">Key</th>
                <th className="font-normal w-1/5 px-3 py-3">Value</th>
              </tr>
            </thead>
            <tbody className="text-xs border-b">
              {list.map((item, key) => (
                <tr key={key} className={"border-b"}>
                  <td>{item.key}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      <div className=" mt-2">
        <input
          type="button"
          {...bindAjaxTrigger()}
          value={loading ? "Loading..." : "Peview Response"}
          className="bg-french-violet-1 hover:bg-french-violet-4 text-white text-xs w-36 h-10 md:text-xs md:w-40 md:h-12 border rounded-lg"
        />
      </div>
    </div>
  );
}
