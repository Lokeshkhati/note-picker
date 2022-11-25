import { useNotes } from "../contexts/notes-context";
import { useState } from "react";

const NoteForm = ({
  title,
  setTitle,
  description,
  setDescription,
  buttonText,
}) => {
  const { createNote } = useNotes();

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  return (
    <div className="flex overflow-hidden  p-4 flex-col ">
      <input
        value={title}
        className=" text-black border border-gray-300   outline-none rounded pl-2 my-4 h-9 sm:h-11 text-lg sm:text-xl font-semibold w-full "
        placeholder="Note Title . . ."
        type="text"
        autoFocus={true}
        onChange={(event) => setTitle(event?.target.value)}
      />
      <textarea
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="start writting . . . "
        className=" text-black border border-gray-300   outline-none rounded pl-2   min-h-[150px]  text-lg sm:text-xl  "
      />

      <div className=" my-2">
        <select
          className="border-2 rounded-sm w-32 border-gray-400 outline-none mt-2 h-10 py-.5 px-2"
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
          className=" border mr-6 py-.5 px-4 text-lg font-semibold text-gray-600 "
        >
          Close
        </button>
        <button
          onClick={() => createNote(title, description)}
          className="text-lg font-semibold py-1 px-4 text-white  bg-indigo-600 hover:bg-indigo-500 "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
