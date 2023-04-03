//"modules" name instead of "utils" of the folder because
// material icons has a different icon

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // manage salt internally

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
};
export const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};

//keep it light because it' on every request of the user
//store it in a cookie or put in auth header saved in localstorage

export const createJWT = (user): string => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET
    );

    return token;
};

export const protect = (req, res, next) => {
    //express lowercases everything
    //json web token vs sessions
    // you don't need to keep open a session, the client store the token on a cookie
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: "not authorized" });
        return;
    }
    const [, token] = bearer.split(" "); //Bearer aisdoaoidiasodioa
    if (!token) {
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        console.log(req.user);
        next();
    } catch (e) {
        console.error(e);
        res.status(401);
        res.json({ message: "not valid token" });
        return;
    }
};

//must be called after protect
export const adminOnly = (req, res, next) => {
    const isAdmin: boolean | undefined = req.user.isAdmin;

    if (!isAdmin) {
        res.status(403).send();
        return;
    }
    next();
};
