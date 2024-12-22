import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required:true,
        default:'uploads/users/defaultCover.jpg'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })


const Notes = mongoose.model('note', notesSchema);

export default Notes