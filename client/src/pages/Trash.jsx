import { useEffect } from "react";
import { useTheme } from "../contexts/theme-context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import NotesList from "../components/NotesList";
import { useNotes } from "../contexts/notes-context";
import { BsTrash } from "react-icons/bs";

const Trash = () => {
  const { theme } = useTheme();
  const { trash } = useNotes();
  const setDocumentTitle = useDocumentTitle();

  useEffect(() => {
    setDocumentTitle(" Note-Picker | Trash");
  }, []);

  return (
    <div
      className={` min-h-screen h-auto  w-full flex justify-center  ${
        theme === "light"
          ? " bg-gray-100 text-gray-900 "
          : "bg-gray-900 text-white"
      }}`}
    >
      <div className="  w-full md:w-3/5">
        {trash?.length > 0 ? (
          <>
            <div className=" my-6 flex items-center justify-between">
              <h1 className="font-semibold mt-2">TRASH</h1>
              <button>
                <BsTrash size="18" />
              </button>
            </div>
            <NotesList notes={trash} />
          </>
        ) : (
          <h1 className="text-lg  text-center font-bold">
            You don't have any notes in trash!
          </h1>
        )}
      </div>
    </div>
  );
};
export default Trash;
