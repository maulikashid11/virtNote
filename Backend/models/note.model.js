import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Note = mongoose.model('note', noteSchema)
export default Note