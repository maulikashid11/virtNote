import { loggedIn } from "../middlewares/loggedIn.js"
import User from "../models/user.model.js"
import Note from "../models/note.model.js"

export async function fetchallnotes(req, res) {
    const { email, id } = req.user
    const user = await User.findOne({_id:id})
    const notes = await Note.find({ user: id })
    res.status(200).json({ success: true, message: 'notes fetched successfully', notes ,user})
}

export async function addnote(req, res) {
    const { email, id } = req.user
    const { title, description } = req.body
    try {

        const user = await User.findOne({ _id: id })
        const newNote = await Note.create({
            title,
            description,
            user: user._id
        })
        res.status(200).json({ success: true, message: "Note added successfully", newNote })
    } catch (err) {
        res.json({ success: true, message: err.message })
    }

}

export async function editnote(req, res) {
    const { title, description, editNoteId } = req.body
    try {
        const newNote = await Note.findOneAndUpdate({ _id: editNoteId }, {
            title,
            description,
        })
        res.status(200).json({ success: true, message: "Note edited successfully" })
    } catch (err) {
        res.json({ success: true, message: err.message })
    }

}
export async function deletenote(req, res) {
    const { deleteNoteId } = req.body
    try {
        const newNote = await Note.findOneAndDelete({ _id: deleteNoteId })
        res.status(200).json({ success: true, message: "Note deleted successfully" })
    } catch (err) {
        res.json({ success: true, message: err.message })
    }

}