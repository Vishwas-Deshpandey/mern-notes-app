import express from "express";
import { loginUser, logoutUser, registerNewUser, updateProfile, userProfile } from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/authMiddleware.js";
import { upload } from "../multer/multerConfig.js";

const router = express.Router();


// register
router.post('/', registerNewUser)

// login
router.post('/login', loginUser)

// logout
router.post('/logout', logoutUser)

// get user profile
router.route('/profile').get(isAuthenticatedUser, userProfile).put(isAuthenticatedUser, upload.single('profilePic') ,updateProfile)


export default router