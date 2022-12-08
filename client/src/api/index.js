import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8000' })

export const fetchNotes = () => API.get('/api/v1/')
export const createNote = (newNote) => API.post('/api/v1/create', newNote)
export const deleteNote = (noteId) => API.delete(`/api/v1/${noteId}`)
export const editNote = (noteId, updatedNote) => API.put(`/api/v1/${noteId}`, updatedNote)
export const changeNoteBgColor = (noteId, newBgColor) => API.put(`/api/v1/changeBgColor/${noteId}`, newBgColor)
export const updateTag = (noteId, updatedTag) => API.put(`/api/v1/updatedTag/${noteId}`, updatedTag)

export const register = (formData) => API.post('/api/v1/register', formData)
export const login = (formData) => API.post('/api/v1/login', formData)
export const currentUser = () => API.get('/api/v1/getCurrentUser')
export const logout = () => API.get('/api/v1/logout')
