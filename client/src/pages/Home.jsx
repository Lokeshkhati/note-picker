import { useEffect } from "react";
import { useTheme } from "../contexts/theme-context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Searchbar from "../components/Searchbar";
import NotesList from "../components/NotesList";
import { useNotes } from "../contexts/notes-context";

const Home = () => {
  const { theme } = useTheme();
  const { notes, pinnedNotes } = useNotes();
  const setDocumentTitle = useDocumentTitle();
 
  useEffect(() => {
    setDocumentTitle(" Note-Picker | Home");
  }, []);

  const numberOfNotes = notes?.length || pinnedNotes?.length;
  return (
    <div
      className={`  min-h-screen h-auto  w-full flex justify-center  ${
        theme === "light"
          ? " bg-[#E5E5E5] text-gray-900 "
          : "bg-gray-900 text-white"
      }} `}
    >
      <div className="  m-6 sm:m-0 w-full sm:w-3/5 ">
        {numberOfNotes > 0 ? (
          <>
            <Searchbar />
            {pinnedNotes?.length > 0 && (
              <>
                <h1 className="font-semibold my-4">PINNED</h1>
                <NotesList notes={pinnedNotes} />
              </>
            )}
            {notes?.length > 0 && (
              <>
                {pinnedNotes?.length > 0 && (
                  <h1 className="font-semibold my-2">OTHERS</h1>
                )}
                <NotesList notes={notes} />
              </>
            )}
          </>
        ) : (
          <h1 className="text-lg  text-center font-bold">
            Opps! You don't have any notes.
          </h1>
        )}
      </div>
    </div>
  );
};
export default Home;
