import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]

    },
    description: {
        type: String,
        required: [true, "Please provide description"],

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Note = mongoose.model('Note', noteSchema)
export { Note } 