import NotesList from "../components/NotesList";
import Searchbar from "../components/Searchbar";
import { useNotes } from "../contexts/notes-context";
import { useTheme } from "../contexts/theme-context";

import { BsPencil } from "react-icons/bs";
import Note from "../components/Note";

const Labels = () => {
  const { theme } = useTheme();
  const {  labels } = useNotes();
  const numberOfNotes = labels?.length;
  console.log(labels);
  return (
    <div
      className={`min-h-screen h-auto  w-full flex justify-center  ${
        theme === "light"
          ? " bg-[#E5E5E5] text-gray-900 "
          : "bg-gray-900 text-white"
      }}`}
    >
      <div className=" m-6 sm:m-0 w-full sm:w-3/5">
        {numberOfNotes > 0 ? (
          <div>
            <Searchbar />
            <>
              <div className=" my-6 flex items-center justify-between">
                <h1 className="text-xl font-bold mt-2">{} </h1>
                <button>
                  <BsPencil />
                </button>
              </div>
            </>
            {/* <NotesList notes={labels} /> */}
            {labels?.map((note) => (
              <>
                <div
                  key={note.id}
                  className=" my-6 flex items-center justify-between"
                >
                  <h1 className="text-xl font-bold mt-2">{note.label} </h1>
                  <button>
                    <BsPencil />
                  </button>
                </div>
                <Note {...note} />
              </>
            ))}
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

export default Labels;
