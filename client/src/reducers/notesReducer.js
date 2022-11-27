export const notesReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {


        case "CREATE_NOTE":
            return {
                ...state,
                notes: [...state.notes, { id: Math.random() * 100, title: payload.title, description: payload.description, createdOn: new Date().toLocaleDateString(), label: "", bgColor: "" }]
            }
        case "FETCH_NOTES_SUCCESS":
            return {
                isLoading: false,
                notes: payload,
                archive: payload,
                labels: [],
                trash: [],
                pinnedNotes: [],
                error: "",
                isEditing: false
            }
        case "FETCH_NOTES_ERROR":
            return {
                isLoading: false,
                notes: [],
                error: "Something went wrong"
            }
        case "EDIT_NOTE":
            return {
                ...state,
            }
        case "DELETE_NOTE":
            return {
                ...state,
                trash: state.trash.filter((note) => note.id !== payload)
            }
        case "ADD_TO_ARCHIVE":
            return {
                ...state,
                archive: [...state.archive, payload],
                notes: state.notes?.filter((note) => note.id !== payload.id),
                pinnedNotes: state.pinnedNotes?.filter((note) => note.id !== payload.id),

            }
        case "REMOVE_FROM_ARCHIVE":
            return {
                ...state,
                archive: state.archive?.filter((note) => note.id !== payload.id),
                trash: state.trash.filter((note) => note.id !== payload.id),
                labels: state.labels?.filter((note) => note.id !== payload.id),
                notes: [...state.notes, payload],
            }
        case "ADD_TO_TRASH":
            return {
                ...state,
                notes: payload.filteredNotes,
                archive: payload.filteredArchive,
                labels: payload.filteredLabels,
                pinnedNotes: payload.filteredPinnedNotes,
                trash: payload.updatedTrash,
            }
        case "RESTORE_FROM_TRASH":
            return {
                ...state,
                trash: state.trash.filter((note) => note.id !== payload.id),
                notes: [...state.notes, payload]
            }
        case "ADD_ALL_NOTES_TO_TRASH":
            return {
                ...state,
                archive: state.archive.filter((note) => note.id !== payload.id),
                trash: [...state.trash, payload]
            }
        case "SET_NOTE_COLOR":
            return {
                ...state,
                notes: state.notes?.map((note) => {
                    if (note.id === payload.noteId) {
                        return { ...note, bgColor: payload.color }
                    }
                    return note;
                }),
                pinnedNotes: state.pinnedNotes?.map((note) => {
                    if (note.id === payload.noteId) {
                        return { ...note, bgColor: payload.color }
                    }
                    return note;
                }),
                archive: state.archive?.map((note) => {
                    if (note.id === payload.noteId) {
                        return { ...note, bgColor: payload.color }
                    }
                    return note;
                }),
            }
        case "SET_NOTE_SEARCH":
            return {
                ...state,
                notes: payload.filteredNotes
            }
        case "SET_NOTE_TO_PIN":
            return {
                ...state,
                notes: state.notes?.filter((note) => note.id !== payload.id),
                // archive: state.archive.filter((note) => note.id !== payload.id),
                // trash: state.trash.filter((note) => note.id !== payload.id),
                pinnedNotes: [...state.pinnedNotes, payload]
            }
        case "SET_NOTE_TO_UNPIN":
            return {
                ...state,
                pinnedNotes: state.pinnedNotes.filter((note) => note.id !== payload.id),
                notes: [...state.notes, payload]
            }
        case "CREATE_NOTE_LABEL":
            return {
                ...state,
                notes: state.notes?.map((note) => {
                    if (note.id === payload.note.id) {
                        return { ...note, label: payload.text }
                    }
                    return note;
                }),
                pinnedNotes: state.pinnedNotes?.map((note) => {
                    if (note.id === payload.note.id) {
                        return { ...note, label: payload.text }
                    }
                    return note;
                }),
                // labels: [...state.labels, payload.note]
            }
        case "SET_NOTE_SEARCH":
            return {
                ...state,
                notes: payload.filteredNotes,
            }

        default:
            return state
    }
}

