const Modal = ({ showModal, setShowModal, children }) => {
  if (!showModal) return null;
  return (
    <div className=" z-40  fixed inset-0 flex justify-center items-center">
      <div
        onClick={() => setShowModal(false)}
        class="fixed inset-0 backdrop-blur-sm bg-black/20"
      ></div>
      <div className="relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-4"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            className="w-3 ml-3"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="black"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
        <div className="  bg-white shadow-lg  rounded ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
