import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please provide description"],
        trim: true,

    },
    bgColor: {
        type: String,

    },
    tag: {
        type: String
    },
    isPinned: {
        type: Boolean,
        default: 'false',
    }
    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema)
export { Note } 