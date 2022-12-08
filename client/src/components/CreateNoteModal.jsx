import { useNotes } from "../contexts/notes-context";
import { useTheme } from "../contexts/theme-context";
import ColorPalette from "./ColorPalette";
import { BsPalette } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { useToggle } from "../hooks/useToggle";
import { useState } from "react";
import Chips from "./Chips";
import * as api from "../api";
import { colors } from "../utils/colors";

const CreateNoteModal = ({ buttonText }) => {
  // const CreateNoteModal = ({ note, setNote, buttonText }) => {
  const { dispatch } = useNotes();
  const { theme } = useTheme();
  const [show, setShow] = useToggle();
  const [isOpen, setIsOpen] = useToggle();
  const [labelText, setLabelText] = useState("");
  const [color, setColor] = useState("");
  const [note, setNote] = useState({
    id: Math.random() * 100 * new Date(),
    title: "",
    description: "",
    label: "",
    bgColor: "",
    createdOn: new Date().toLocaleDateString(),
    isPinned: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };
  const handleColor = (color) => {
    setColor(color);
    setNote(...note, { bgColor: color });
  };
  const createNote = async () => {
    const { data } = await api.createNote(note);
    console.log(data);

    const { notes } = data;
    dispatch({ type: "CREATE", payload: notes });
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className={` ${
        theme === "light"
          ? " bg-white text-slate-800 "
          : "  bg-gray-900 text-slate-200"
      } flex overflow-hidden  p-4 flex-col`}
    >
      <input
        name="title"
        value={note.title}
        style={{ backgroundColor: color }}
        className={` ${
          theme === "light"
            ? " bg-white text-slate-800 "
            : "  bg-gray-900 text-slate-200 border-slate-800"
        } border   outline-none rounded pl-2 my-4 h-9 sm:h-11 text-lg sm:text-xl font-semibold w-full `}
        placeholder="Note Title . . ."
        type="text"
        autoFocus={true}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={note.description}
        onChange={handleChange}
        placeholder="start writing . . . "
        style={{ backgroundColor: color }}
        className={` ${
          theme === "light"
            ? " bg-white text-slate-800  "
            : "  bg-gray-900 text-slate-200 border-slate-800"
        } border   outline-0 rounded pl-2  min-h-[90px] sm:min-h-[150px]  text-lg sm:text-xl  `}
      />
      {labelText.length > 2 && (
        <div className="flex items-center gap-4 mt-2">
          <span>Tag : </span>
          <Chips text={labelText} />
        </div>
      )}
      <div className="flex justify-between items-center my-2">
        <div className="relative">
          <button onClick={setIsOpen}>
            <MdLabelOutline size="18" />
          </button>

          {isOpen && (
            <div
              className={` shadow-lg z-40  w-96 md:w-2/5 rounded  absolute top-6 right-6 `}
            >
              <form
                // onSubmit={handleSubmit}
                className={`  ${
                  theme === "light"
                    ? " bg-slate-200 text-slate-800   "
                    : "  bg-gray-800 text-slate-200 "
                } flex justify-between items-start mt-2 pt-4 p-2 h-16 w-40 rounded-sm  `}
              >
                <input
                  value={labelText}
                  autoFocus={true}
                  onChange={(event) => setLabelText(event.target.value)}
                  placeholder="Create tag"
                  className={`  ${
                    theme === "light"
                      ? " bg-slate-200 text-slate-800  "
                      : "  bg-gray-800 text-slate-200 "
                  } border border-slate-500s w-full  outline-none  py-.5 px-2`}
                />
                <button
                  type="submit"
                  className="font-bold   border border-blue-500 bg-blue-500 px-2 py-.5 "
                >
                  +
                </button>
              </form>
            </div>
          )}
        </div>

        <div>
          <button onClick={setShow}>
            <BsPalette size="18" />
          </button>

          <div className="  z-40  w-96 md:w-2/5 rounded  absolute top-1/5 right-1/3   ">
            {show && (
              <div className="absolute right-0 top-0  sm:w-72  flex flex-wrap justify-center items-center bg-white gap-2 sm:gap-4 p-2  shadow-md rounded">
                {colors.map(({ id, color }) => (
                  <li
                    key={id}
                    onClick={() => handleColor(color)}
                    style={{ backgroundColor: color }}
                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-full list-none cursor-pointer"
                  ></li>
                ))}
              </div>
            )}
          </div>
        </div>
        <select
          style={{ backgroundColor: color }}
          className={` ${
            theme === "light"
              ? " bg-white text-slate-800 "
              : "  bg-gray-900 text-slate-200 border-slate-800"
          } border rounded w-32 outline-none mt-2 h-10 py-.5 px-2`}
          name="Sort By date"
        >
          <option value="Newest First">Low</option>
          <option value="Oldest First">Medium</option>
          <option value="Oldest First">High</option>
        </select>
      </div>
      <div className="flex justify-between mt-4">
        <button
          // onClick={() => setShow(false)}
          className="border  mr-6 py-.5 px-4 text-lg font-semibold  "
        >
          Cancel
        </button>
        <button
          onClick={() => createNote(note)}
          className="text-lg font-semibold py-1 px-4 text-white  bg-indigo-600 hover:bg-indigo-500 "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CreateNoteModal;
