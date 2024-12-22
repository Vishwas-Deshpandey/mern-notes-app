import jwt from 'jsonwebtoken';


const genrateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "4d" });

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge: 4 * 24 * 60 * 60 * 1000
    })
}

export default genrateToken;