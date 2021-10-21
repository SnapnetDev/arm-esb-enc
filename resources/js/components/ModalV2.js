import { useEffect, useRef } from "react";

export const ModalV2 = ({ children, show, title, bindAction, width, flexValue }) => {
  const ref = useRef(null);
  const closeModalRef = useRef(null);

  useEffect(() => {
    if (ref.current && show) $(ref.current).modal();
  }, [show]);

  const closeModal = () => {
    $(closeModalRef.current).trigger("click");
  };

  // id="myModal"
  return (
    //  <!-- modal Container -->
    //   <!-- modal overlay -->
    <div
      ref={ref}
      id="modal-overlay"
      className=" modal-fade hidden absolute inset-0 bg-black bg-opacity-30 h-full overflow-scroll w-full flex justify-center items-start md:items-center pt-10 md:pt-0"
      role="dialog"
    >
      {/* <!-- modal --> */}
      <div
        id="credential-modal"
        className={
          "modal-dialog container mx-auto bg-white rounded-md pl-8 pr-8 pb-6 pt-6 transform relative shadow-lg transition-opacity transition-transform duration-300 " +
          (width ? width : "w-2/6")
        }
      >
        {/* <!-- modal header --> */}
        <div className="flex justify-between pt-4 pb-4">
          <h6 className="text-lg">{title}</h6>
          {/* <!-- close button --> */}
          <button className="close" data-dismiss="modal">
            <i className="ri-close-line hover:text-red-400 text-lg text-gray-600"></i>
          </button>
        </div>
        {/* modal body  */}
        <div>
          <div className=" space-y-4">
            {/* <div className=" flex flex-wrap gap-3">{children}</div> */}
            <div className="flex flex-col space-y-4">{children}</div>
          </div>
          <br />
          {/* <!-- Action buttons --> */}
          <div className="flex space-x-4 sticky bottom-0 float-none">
            <button {...bindAction(closeModal)} type="submit" className="btn flex-1 bg-french-violet-1 text-xs capitalize font-normal">
              Save
            </button>
            <button
              //  onclick="openModal(false)"
              ref={closeModalRef}
              type="button"
              className="btn btn-outline border-french-violet-1 text-french-violet-1 flex-1 text-xs capitalize font-normal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
