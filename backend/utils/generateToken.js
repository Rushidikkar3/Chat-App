import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "10d"});

    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 10,
        httpOnly: true,  //prevent XSS attacks 
        sameSite: "strict", //prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development" // it is true or false, it consider true when we are in production mode
    })
}

export default generateTokenAndSetCookies;