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
  labels: [],
  trash: [],
  pinnedNotes: [],
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

  const createNote = (title, description) => {
    dispatch({ type: "CREATE", payload: { title, description } })
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
    const filteredPinnedNotes = state.pinnedNotes.filter((note) => note.id !== noteId);
    const updatedTrash = [...state.trash, note]

    dispatch({ type: "TRASH", payload: { filteredNotes, filteredArchive, updatedTrash, filteredPinnedNotes } })
  }
  const restoreFromTrash = (note) => {
    dispatch({ type: "UNTRASH", payload: note })
  }

  const pinNote = (note) => {
    dispatch({ type: "PIN", payload: note })
  }
  const unPinNote = (note) => {
    dispatch({ type: "UNPIN", payload: note })
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
    console.log(filteredNotes)
    dispatch({ type: "SEARCH", payload: { filteredNotes } })
  }

  const noteBgColor = (color, noteId) => {
    dispatch({ type: "COLOR", payload: { color, noteId } })
  }


  const values = {
    notes: state.notes,
    trash: state.trash,
    archive: state.archive,
    labels: state.labels,
    pinnedNotes: state.pinnedNotes,
    isEditing: state.isEditing,
    isLoading: state.isLoading,
    createNote,
    addToArchive,
    deleteNoteForever,
    removeFromArchive,
    addToTrash,
    restoreFromTrash,
    noteBgColor,
    pinNote, unPinNote,
    createLabel,
    searchNotes
  }
  return (
    <NotesContext.Provider value={values}>{children}</NotesContext.Provider>
  );
};
export { NotesProvider, useNotes };

