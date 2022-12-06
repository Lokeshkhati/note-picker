import express from 'express';
const router = express.Router()

import { getNotes, createNote, updateNote, deleteNote, getNoteById, changeBgColor, updateTag } from '../controllers/noteController.js'
import { isLoggedIn } from '../middlewares/user.js'

router.route('/').get(isLoggedIn, getNotes)
router.route('/create').post(isLoggedIn, createNote)
router.route('/:id').get(getNoteById)
router.route('/:id').put(isLoggedIn, updateNote)
router.route('/changeBgColor/:id').put(isLoggedIn, changeBgColor)
router.route('/updateTag/:id').put(isLoggedIn, updateTag)
router.route('/:id').delete(isLoggedIn, deleteNote)

export default router