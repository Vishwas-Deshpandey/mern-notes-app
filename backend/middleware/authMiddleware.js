import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

// verify the user token

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt

    if (token) {
        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET);

             req.user = await User.findById(decode.userId).select("-password")

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Unauthorized Access, Invalid token")
        }
    } else {
        res.status(401);
        throw new Error("Unauthorized Access, No token")
    }
})

export {
    isAuthenticatedUser
}