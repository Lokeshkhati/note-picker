import { useTheme } from "../contexts/theme-context";

const Modal = ({ showModal, setShowModal, children }) => {
  const { theme } = useTheme();
  if (!showModal) return null;
  return (
    <div className=" z-40  fixed inset-0 flex justify-center items-center">
      <div
        onClick={() => setShowModal(false)}
        class="fixed inset-0  bg-black/40"
      ></div>
      <div className="relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute  top-2 right-4"
        >
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
            <path
              d="M0 0L10 10M10 0L0 10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              color={`${theme === "light" ? "black " : "white"}`}
            ></path>
          </svg>
        </button>
        <div className="  bg-white shadow-lg  rounded ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
