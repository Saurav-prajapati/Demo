import jwt from "jsonwebtoken";
import userDb from "../model/signUpSchema.js";

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.usercookie;
        if (!token) { throw new Error('token not found') }
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await userDb.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) { throw new Error("User not found") }
        req.token = token;
        req.rootUser = rootUser;
        req.UserID = rootUser._id;
        next();
    } catch (error) {
        res.status(401).send({ msg: 'Unauthorized: No token provided', status: 401 });
    }
}


export default Authenticate;
