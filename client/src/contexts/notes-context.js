import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { notesReducer } from "../reducers/notesReducer";
import axios from 'axios';
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

  const getNotes = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/', {
        headers: { Authorization: token }
      })

      dispatch({ type: "FETCH_NOTES_SUCCESS", payload: response.data.notes })
    } catch (error) {
      dispatch({ type: "FETCH_NOTES_SUCCESS", })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getNotes(token)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  // const createNote = (title, description) => {
  //   dispatch({ type: "CREATE_NOTE", payload: { title, description } })
  //   console.log(title, description)
  // }

  const createNote = async (title, description) => {
    try {

      const token = localStorage.getItem("token")
      if (token) {
        const newNote = { title, description }
        await axios.post("http://localhost:8000/api/v1/create", newNote, {
          headers: { Authorization: token }
        })
        dispatch({ type: "CREATE_NOTE", payload: { title, description } })
      }
    } catch (error) {
      console.log(error)
    }
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

