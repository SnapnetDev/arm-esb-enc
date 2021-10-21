import { useEffect, useRef } from "react";

export const Modal = ({ children, show, title, bindAction, large }) => {
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
    <div ref={ref} className="modal fade" role="dialog">
      <div className={"modal-dialog " + (large ? " modal-lg" : "")}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="row">{children}</div>
            {/* <p>Some text in the modal.</p> */}
          </div>
          <div className="modal-footer">
            <input type="button" {...bindAction(closeModal)} />
            <button ref={closeModalRef} type="button" className="btn btn-default" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
