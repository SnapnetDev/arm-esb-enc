import React, { useContext, useEffect, useRef } from "react";

export const ModalTailContext = React.createContext({});
export const ModalRegion = ({ children, init }) => {
  const modalOuterRef = useRef(null);
  const modalInnerRef = useRef(null);

  const handleModal = (value) => {
    const modalCl = modalInnerRef.current.classList; //classList
    const overlayCl = modalOuterRef.current;

    if (value) {
      overlayCl.classList.remove("hidden");
      setTimeout(() => {
        modalCl.remove("opacity-0");
        modalCl.remove("-translate-y-full");
        modalCl.remove("scale-150");
      }, 100);
    } else {
      modalCl.add("-translate-y-full");
      setTimeout(() => {
        modalCl.add("opacity-0");
        modalCl.add("scale-150");
      }, 100);
      setTimeout(() => overlayCl.classList.add("hidden"), 300);
    }
  };
  const openModal = () => handleModal(true);
  const closeModal = () => handleModal(false);
  const providerValue = { openModal, closeModal, modalInnerRef, modalOuterRef };

  useEffect(() => {
    if (init) {
      init({ openModal, closeModal });
    }
  }, []);

  return <ModalTailContext.Provider value={providerValue}>{children}</ModalTailContext.Provider>;
};

export const ModalContainer = ({ children }) => {
  const { modalOuterRef } = useContext(ModalTailContext);
  return (
    <div
      ref={modalOuterRef}
      className="hidden z-50 absolute inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0 overflow-scroll"
    >
      {children}
    </div>
  );
};

export const ModalContent = ({ title, children, width, height }) => {
  const { modalInnerRef, closeModal } = useContext(ModalTailContext);
  return (
    <div
      ref={modalInnerRef}
      className={`
                container
                mx-auto
                bg-white
                ${width ? width : "w-2/6"}
                ${height ?? ""}
                rounded-md
                pl-6
                pr-6
                pb-6
                pt-6
                opacity-0
                transform
                -translate-y-full
                scale-150
                relative
                shadow-lg
                transition-opacity transition-transform
                duration-300
                overflow-scroll
              `}
    >
      {/* <!-- modal header --> */}
      <div className="flex justify-between pt-4 pb-4">
        <h6 className="text-lg">{title}</h6>
        {/* <!-- close button --> */}
        <button onClick={closeModal}>
          <i className="ri-close-line hover:text-red-400 text-lg text-gray-600"></i>
        </button>
      </div>
      {/* <!-- modal body --> */}
      {children}
    </div>
  );
};
