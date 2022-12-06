import { useNotes } from "../contexts/notes-context";
import { useState } from "react";
import { useTheme } from "../contexts/theme-context";

const NoteForm = ({ note, setNote, buttonText }) => {
  const { createNote } = useNotes();
  const { theme } = useTheme();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote({ [name]: value });
  };

  return (
    <div
      className={` ${
        theme === "light"
          ? " bg-white text-slate-800 "
          : "  bg-gray-900 text-slate-200"
      } flex overflow-hidden  p-4 flex-col`}
    >
      <input
        value={note.title}
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
        className={` ${
          theme === "light"
            ? " bg-white text-slate-800  "
            : "  bg-gray-900 text-slate-200 border-slate-800"
        } border   outline-0 rounded pl-2  min-h-[90px] sm:min-h-[150px]  text-lg sm:text-xl  `}
      />

      <div className="flex justify-between items-center my-2">
        <div>Label</div>
        <div>Color</div>
        <select
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

export default NoteForm;
