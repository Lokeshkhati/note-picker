import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { notesReducer } from "../reducers/notesReducer";
// import axios from 'axios';
const initialState = {
  notes: [{
    id: Math.random() * 100,
    title: 'Learn to Code',
    description: "Learn to Code Learn to Code Learn to Code  Learn to Code Learn to Code",
    bgColor: "",
    label: "Code",
    createdOn: new Date().toLocaleDateString(),
  }, {
    id: Math.random() * 100,
    title: 'Learn to Cook',
    description: "Learn to Cook Learn to Cook Learn to Cook  Learn to Cook Learn to Cook",
    bgColor: "",
    label: "Cook",
    createdOn: new Date().toLocaleDateString(),
  }, {
    id: Math.random() * 100,
    title: 'Learn to Fuck',
    description: "Learn to Fuck Learn to Fuck Learn to Fuck  Learn to Fuck Learn to Fuck",
    bgColor: "",
    label: "Fuck",
    createdOn: new Date().toLocaleDateString(),
  }],
  archive: [],
  labels: [],
  trash: [],
  pinnedNotes: [],
  isLoading: false,
  isEditing: false
};

const storedValues = (initialState) =>
  JSON.parse(localStorage.getItem("state")) || initialState;

const NotesContext = createContext()

const useNotes = () => useContext(NotesContext);

const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState, storedValues);

  // const getNotes = async () => {
  //   try {
  //     const data = await axios.get('http://localhost:8000/api/v1/')
  //     console.log(data)

  //     // dispatch({ type: "SET_NOTES", payload: data })
  //   } catch (error) {

  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   getNotes()
  // })
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const createNote = (title, description) => {
    dispatch({ type: "CREATE_NOTE", payload: { title, description } })
    console.log(title, description)
  }

  const deleteNoteForever = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id })
  }
  const addToArchive = (note) => {
    dispatch({ type: "ADD_TO_ARCHIVE", payload: note })
  }
  const removeFromArchive = (note) => {
    dispatch({ type: "REMOVE_FROM_ARCHIVE", payload: note })
  }
  const addToTrash = (note, noteId) => {
    const filteredNotes = state.notes.filter((note) => note.id !== noteId);
    const filteredArchive = state.archive.filter((note) => note.id !== noteId);
    const filteredPinnedNotes = state.pinnedNotes.filter((note) => note.id !== noteId);
    const updatedTrash = [...state.trash, note]

    dispatch({ type: "ADD_TO_TRASH", payload: { filteredNotes, filteredArchive, updatedTrash, filteredPinnedNotes } })
  }
  const restoreFromTrash = (note) => {
    dispatch({ type: "RESTORE_FROM_TRASH", payload: note })
  }
  const addAllNotesToTrash = (note) => {
    dispatch({ type: "ADD_ALL_NOTES_TO_TRASH", payload: note })
  }
  const pinNote = (note) => {
    dispatch({ type: "SET_NOTE_TO_PIN", payload: note })
  }
  const unPinNote = (note) => {
    dispatch({ type: "SET_NOTE_TO_UNPIN", payload: note })
  }
  const createLabel = (note, text) => {

    dispatch({ type: "CREATE_NOTE_LABEL", payload: { note, text } })
  }
  const searchNotes = (searchTerm) => {
    console.log(searchTerm)
    const filteredNotes = state.notes.filter((note) => {
      return note.title.toLowerCase().includes(searchTerm)
    }
    );
    console.log(filteredNotes)
    dispatch({ type: "SET_NOTE_SEARCH", payload: { filteredNotes } })
  }

  const noteBgColor = (color, noteId) => {
    dispatch({ type: "SET_NOTE_COLOR", payload: { color, noteId } })
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
    addAllNotesToTrash,
    pinNote, unPinNote,
    createLabel,
    searchNotes
  }
  return (
    <NotesContext.Provider value={values}>{children}</NotesContext.Provider>
  );
};
export { NotesProvider, useNotes };

