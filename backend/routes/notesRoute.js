import express from "express";
import { createNewNote, deleteAll, deleteNote, getAllNotes, getNote, updateNote } from "../controller/notesController.js";
import { isAuthenticatedUser } from '../middleware/authMiddleware.js'
import { upload } from '../multer/multerConfig.js'
const router = express.Router();

// create note
router.post('/', isAuthenticatedUser, upload.single('coverImage') ,createNewNote);

// get and delete all notes
router.route('/all-notes').get(isAuthenticatedUser, getAllNotes).delete(isAuthenticatedUser, deleteAll)

// get update and delete single notes
router.route('/note/:id').get(isAuthenticatedUser, getNote).put(isAuthenticatedUser, upload.single("coverImage") ,updateNote).delete(isAuthenticatedUser, deleteNote)


export default router