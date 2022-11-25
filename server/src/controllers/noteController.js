
import { Note } from '../models/note.js'
import { CustomError } from '../utils/customError.js'

const createNote = async (req, res, next) => {
    const { title, description } = req.body
    if (!title || !description) {
        return next(new CustomError('Title and Description are required', 400))
    }
    const note = new Note({ user: req.user.id, title, description })
    await note.save()
    res.status(200).json({ success: true, note })
}

const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user_id: req.user.id })
        if (!notes) {
            return next(new CustomError('Notes not found', 400))
        }
        res.status(200).json({ success: true, notes })
    } catch (error) {
        return next(new CustomError(error, 500))
    }
}

const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return next(new CustomError('Note not found', 400))
        }

        res.status(200).json({ sucess: true, note })
    } catch (error) {
        return next(new CustomError(error, 500))
    }
}

const updateNote = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const note = await Note.findOneAndUpdate({ _id: req.params.id }, { title, description })

        if (!note) {
            return next(new CustomError('Note not found', 400))
        }
        res.status(200).json({ success: true, note })

    } catch (error) {
        return next(new CustomError(error, 500))
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findOneAndDelet(req.params.id)
        if (!note) {
            return next(new CustomError('Note not found', 400))
        }
        res.json({ sucess: true, message: "Deleted a note" })
    } catch (error) {
        return next(new CustomError(error, 500))
    }
}
export { createNote, getNotes, getNoteById, updateNote, deleteNote }