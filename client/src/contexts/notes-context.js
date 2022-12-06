import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { notesReducer } from "../reducers/notesReducer";
const initialState = {
  notes: [],
  archive: [],
  trash: [],
  isLoading: false,
  isEditing: false,
  error: ''
};


const storedValues = (initialState) =>
  JSON.parse(localStorage.getItem("state")) || initialState;

const NotesContext = createContext()

const useNotes = () => useContext(NotesContext);

const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState, storedValues);


  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const createNote = (note) => {
    dispatch({ type: "CREATE", payload: note })
  }

  const deleteNoteForever = (id) => {
    dispatch({ type: "NOTE", payload: id })
  }
  const addToArchive = (note) => {
    dispatch({ type: "ARCHIVE", payload: note })
  }
  const removeFromArchive = (note) => {
    dispatch({ type: "UNARCHIVE", payload: note })
  }
  const addToTrash = (note, noteId) => {
    const filteredNotes = state.notes.filter((note) => note.id !== noteId);
    const filteredArchive = state.archive.filter((note) => note.id !== noteId);
    const updatedTrash = [...state.trash, note]

    dispatch({ type: "TRASH", payload: { filteredNotes, filteredArchive, updatedTrash, } })
  }
  const restoreFromTrash = (note) => {
    dispatch({ type: "UNTRASH", payload: note })
  }

  const pinNote = (noteId) => {
    dispatch({
      type: "PIN", payload: noteId
    })
  }
  const createLabel = (note, text) => {

    dispatch({ type: "LABEL", payload: { note, text } })
  }
  const searchNotes = (searchTerm) => {
    console.log(searchTerm)
    const filteredNotes = state.notes.filter((note) => {
      return note.title.toLowerCase().includes(searchTerm)
    }
    );
    dispatch({ type: "SEARCH", payload: { filteredNotes } })
  }

  const noteBgColor = (color, noteId) => {
    dispatch({ type: "COLOR", payload: { color, noteId } })
  }


  const values = {
    notes: state.notes,
    trash: state.trash,
    archive: state.archive,
    isEditing: state.isEditing,
    isLoading: state.isLoading,
    createNote,
    addToArchive,
    deleteNoteForever,
    removeFromArchive,
    addToTrash,
    restoreFromTrash,
    noteBgColor,
    pinNote,
    createLabel,
    searchNotes
  }
  return (
    <NotesContext.Provider value={values}>{children}</NotesContext.Provider>
  );
};
export { NotesProvider, useNotes };

