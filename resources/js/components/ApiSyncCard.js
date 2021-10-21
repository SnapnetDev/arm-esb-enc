import { NavLink } from "react-router-dom";

export const ApiSyncCard = ({ data, status, syncLink }) => {
  return (
    <>
      <div className=" container mx-0 bg-white space-y-2 p-4 max-w-sm rounded-lg">
        <h6 className="text-base md:text-lg">Sync API Store To Account </h6>
        <p className="text-xs md:text-sm">
          {data.api.name} From {data.api.category.name}
        </p>
        <div className="flex justify-between">
          <p className="text-1xs inline-block text-gray-800">
            <span className="mr-2">
              <i className="ri-timer-line text-sm text-french-violet-1 align-middle"></i>
            </span>
            Runs {data.frequency_time}
          </p>
          {status ? (
            <span className="animate-spin">
              <i className="ri-loader-3-fill text-3xl text-success-1 align-middle"></i>
            </span>
          ) : (
            ""
          )}
        </div>
        {/* <!-- </br> --> */}
        {/* <!--  link button --> */}
        <div className="flex">
          <NavLink
            to={syncLink}
            className="block mt-3 hover:text-french-violet-6 hover:border-french-violet-6 text-french-violet-1 border-b-2 border-french-violet-1 text-xs tracking-normal-1"
          >
            View Details
            <span className="align-middle inline-block">
              <i className="ri-arrow-right-line text-base text-french-violet-1 ml-2"></i>
            </span>
          </NavLink>
        </div>
      </div>

      <br />
    </>
  );
};
