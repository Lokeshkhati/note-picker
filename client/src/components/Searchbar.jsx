import { AiOutlineSearch } from "react-icons/ai";
import FilterNotes from "./FilterNotes";
import { useState, useRef } from "react";
import Modal from "./Modal";
import { useTheme } from "../contexts/theme-context";
import { useNotes } from "../contexts/notes-context";
const Searchbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();
  const { searchNotes } = useNotes();
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    searchNotes(query);
  };
  return (
    <>
      <div
        className={` ${
          theme === "light"
            ? " bg-white text-slate-800 "
            : "  bg-gray-800 text-white"
        }  flex items-center px-4 w-full   rounded h-11`}
      >
        <button onClick={() => searchNotes(query)}>
          <AiOutlineSearch color="#9A9A9A" size="25" />
        </button>
        <input
          value={query}
          onChange={handleChange}
          placeholder="Search"
          className={`${
            theme === "light"
              ? " bg-white text-slate-800 "
              : "  bg-gray-800 text-white"
          } pl-4  text-lg w-full  outline-none border-none h-full`}
          type="text"
        />
        <button
          onClick={() => setShowModal(true)}
          className="flex justify-center   items-center h-10 w-10 rounded cursor-pointer"
        >
          <svg
            _ngcontent-rlp-c10=""
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 20 20"
            className=" ng-star-inserted"
            fill="#9A9A9A"
          >
            <path
              _ngcontent-rlp-c10=""
              d="M2.5 15.833v-1.75h5.167v1.75Zm0-9.916v-1.75h8.271v1.75ZM9.208 17.5v-5.062h1.75v1.645H17.5v1.75h-6.542V17.5Zm-3.291-4.958v-1.667H2.5v-1.75h3.417V7.479h1.75v5.063Zm3.291-1.667v-1.75H17.5v1.75Zm3.125-3.313V2.5h1.75v1.667H17.5v1.75h-3.417v1.645Z"
            ></path>
          </svg>
        </button>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className=" w-80 sm:w-96 ">
          <FilterNotes />
        </div>
      </Modal>
    </>
  );
};

export default Searchbar;
