import { useEffect } from "react";
import { API_PATH } from "./Config";
import { useAjaxCall } from "./Hooksv2";

export default function ApiResponse({ apiId }) {
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
        <div
          className="col-md-12"
          style={{
            overflow: "auto",
            border: "1px solid #999",
            padding: 0,
          }}
        >
          {loading ? <i>Waiting For Response...</i> : ""}
          <table className="table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, key) => (
                <tr key={key}>
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
      <div className="col-md-12" style={{ padding: 0, marginTop: "10px" }}>
        <input
          type="button"
          {...bindAjaxTrigger()}
          value={loading ? "Loading..." : "Peview Response"}
          className="btn btn-sm btn-info"
        />
      </div>
    </div>
  );
}
