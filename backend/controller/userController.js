import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import genrateToken from '../utils/genrateToken.js';
import fs from 'fs'
import path from 'path'

const registerNewUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body

    if (!name) {
        res.status(400);
        throw new Error("Name is required")
    }

    if (!email) {
        res.status(400);
        throw new Error("Email is required")
    }

    if (!password) {
        res.status(400);
        throw new Error("Password is required")
    }

    if (!phone) {
        res.status(400);
        throw new Error("Phone is required")
    }

    // check wheather the email already exist or not
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User Already Exist")
    }

    const user = await User.create({
        name,
        email,
        password,
        phone
    })

    // if user created genrate a token for him

    if (user) {
        genrateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic:user.profilePic
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data')
    }


});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email is required")
    }

    if (!password) {
        res.status(400);
        throw new Error("Password is required")
    }

    // find user with email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        genrateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic:user.profilePic
        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
})


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: "LoggedOut Successfully"
    })
})

const userProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profile: req.user.profilePic,
        phone: req.user.phone
    }

    res.status(200).json(user)
})


const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);


    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone

        if (req.body.password) {
            user.password = req.body.password || user.password
        }

        if (req.file) {
            
            if (user.profilePic !== 'uploads/users/default.png') {
                fs.unlink(path.resolve(`./backend/public/${user.profilePic}`), (err) => {
                    if(err){
                        console.log(err)
                    }
                })
            }

            user.profilePic = `uploads/users/${req.file.filename}` || user.profilePic
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            profilePic: updatedUser.profilePic
        })
    }

})

export {
    registerNewUser,
    loginUser,
    logoutUser,
    userProfile,
    updateProfile
}




