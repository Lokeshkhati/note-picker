import React from "react";
import { BsTrash } from "react-icons/bs";
import NotesList from "../components/NotesList";
import Searchbar from "../components/Searchbar";
import { useNotes } from "../contexts/notes-context";
import { useTheme } from "../contexts/theme-context";

const Archive = () => {
  const { theme } = useTheme();
  const { archive, addAllNotesToTrash } = useNotes();
  const numberOfNotes = archive?.length;
  return (
    <div
      className={`   min-h-screen h-auto  w-full flex justify-center ${
        theme === "light"
          ? " bg-[#E5E5E5] text-gray-900 "
          : "bg-gray-900 text-white"
      }}`}
    >
      <div className=" m-6 sm:m-0 w-full sm:w-3/5">
        {numberOfNotes > 0 ? (
          <div>
            <Searchbar />
            <div className=" my-6 flex items-center justify-between">
              <h1 className="font-semibold mt-2">ARCHIVED</h1>
              <button onClick={() => addAllNotesToTrash()}>
                <BsTrash size="18" />
              </button>
            </div>
            <NotesList notes={archive} />
          </div>
        ) : (
          <h1 className="text-lg  text-center font-bold">
            Opps! You don't have any notes.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Archive;
