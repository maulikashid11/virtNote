import express from "express"
import { loggedIn } from "../middlewares/loggedIn.js"
import User from "../models/user.model.js"
import Note from "../models/note.model.js"
import { addnote, deletenote, editnote, fetchallnotes } from "../controllers/note.controller.js"
const router = express.Router()
// fetch all notes
router.get('/fetchallnotes', loggedIn, fetchallnotes)

// add note
router.post('/addnote', loggedIn, addnote)

// edit note
router.put('/editnote', loggedIn, editnote)

//delete note
router.delete('/deletenote', loggedIn, deletenote)

export default router