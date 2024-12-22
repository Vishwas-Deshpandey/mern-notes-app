import asyncHandler from 'express-async-handler';
import Notes from '../models/notesModel.js';
import fs from 'fs';
import path from 'path';
import User from '../models/userModel.js';

const createNewNote = asyncHandler(async (req, res) => {

    const { title, note } = req.body;


    if (!title) {
        res.status(400);
        throw new Error("Title is required")
    }

    if (!note) {
        res.status(400);
        throw new Error("Note is required")
    }

    const createNote = new Notes({
        title,
        note,
        createdBy: req.user._id,
    })

    if (req.file) {
        createNote.coverImage = `uploads/users/${req.file.filename}`
    }

    await createNote.save();

    res.status(201).send({
        message: "new note is added"
    })
})

const getAllNotes = asyncHandler(async (req, res) => {
    const allNotes = await Notes.find({ createdBy: req.user._id });

    res.status(200).json(allNotes)
})

const getNote = asyncHandler(async (req, res) => {
    const note = await Notes.findById(req.params.id).populate({
        path: "createdBy",
        select: "name"
    })

    res.status(200).json(note)
})

const updateNote = asyncHandler(async (req, res) => {
    const CurrentNote = await Notes.findById(req.params.id);


    if (CurrentNote) {
        CurrentNote.title = req.body.title || CurrentNote.title
        CurrentNote.note = req.body.note || CurrentNote.note
        CurrentNote.createdBy = req.user._id

        if (req.file) {
            if (CurrentNote.coverImage !== 'uploads/users/defaultCover.jpg') {
                fs.unlink(path.resolve(`./backend/public/${CurrentNote.coverImage}`), (err) => {
                    if (err) {
                        console.log(err.message)
                    }
                });
            }

            // CurrentNote.coverImage = `/uploads/images/${req.file.filename}` || CurrentNote.coverImage
            CurrentNote.coverImage = `uploads/users/${req.file.filename}` || CurrentNote.coverImage
        }

        await CurrentNote.save();

        res.status(200).json({
            message: "Note Has Been Updated Successfully"
        })

    }

})

const deleteNote = asyncHandler(async (req, res) => {

    const deleteNote = await Notes.findByIdAndDelete(req.params.id);

    if (deleteNote.coverImage !== 'uploads/users/defaultCover.jpg') {
        fs.unlink(path.resolve(`./backend/public/${deleteNote.coverImage}`), (err) => {
            if (err) {
                console.log(err.message)
            }
        })

    }

    res.status(200).json({
        message: "Note Has Been Deleted Successfully"
    })
})

const deleteAll = asyncHandler(async (req, res) => {
    const findUserNotes = await Notes.find({ createdBy: req.user._id });

    findUserNotes.forEach((note) => {
        if (note.coverImage) {
            fs.unlink(path.resolve(`./backend/public/${note.coverImage}`), (err) => {
                if (err) {
                    console.log(err.message)
                }
            })
        }
    });

    await Notes.deleteMany({ createdBy: req.user._id });

    res.status(200).json({
        message: "All Notes are deleted Successfully"
    })
})

export {
    createNewNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote,
    deleteAll
}