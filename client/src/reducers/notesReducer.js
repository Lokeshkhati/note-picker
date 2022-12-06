export const notesReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case "CREATE":
            return {
                ...state,
                notes: [...state.notes, { id: Math.random() * 100, title: payload.title, description: payload.description, createdOn: new Date().toLocaleDateString(), label: "", bgColor: "", isPinned: false }]
            }
        case "EDIT":
            return {
                ...state,
            }
        case "ARCHIVE":
            return {
                ...state,
                archive: [...state.archive, payload],
                notes: state.notes?.filter((note) => note.id !== payload.id),


            }
        case "UNARCHIVE":
            return {
                ...state,
                archive: state.archive?.filter((note) => note.id !== payload.id),
                // trash: state.trash.filter((note) => note.id !== payload.id),
                // labels: state.labels?.filter((note) => note.id !== payload.id),
                notes: [...state.notes, payload],
            }

        case "DELETE":
            return {
                ...state,
                trash: state.trash.filter((note) => note.id !== payload)
            }
        case "TRASH":
            return {
                ...state,
                notes: payload.filteredNotes,
                archive: payload.filteredArchive,
                labels: payload.filteredLabels,
                trash: payload.updatedTrash,
            }
        case "UNTRASH":
            return {
                ...state,
                trash: state.trash.filter((note) => note.id !== payload.id),
                notes: [...state.notes, payload]
            }
        case "COLOR":
            return {
                ...state,
                notes: state.notes?.map((note) => {
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
        case "SEARCH":
            return {
                ...state,
                notes: payload.filteredNotes
            }
        case "PIN":
            return {
                ...state,
                notes: state.notes.map((item) => {
                    return action.payload === item.id
                        ? { ...item, isPinned: !item.isPinned }
                        : item;
                }),
            }
        case "LABEL":
            return {
                ...state,
                notes: state.notes?.map((note) => {
                    if (note.id === payload.note.id) {
                        return { ...note, label: payload.text }
                    }
                    return note;
                }),

                // labels: [...state.labels, payload.note]
            }

        default:
            return state
    }
}

