import { User } from "@prisma/client";
import { Request, Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import prisma from "../modules/db";
import { getUserLikes } from "./like";

export const createNewUser = async (req: Request, res: Response, next) => {
    let user: User;
    try {
        user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: await hashPassword(req.body.password),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                instagram_uname: req.body.instagram_uname,
                gender: req.body.gender,
            },
        });
    } catch (e) {
        if (e.code === "P2002") {
            //duplicate email or instagram name
            e.type = "email";
            next(e);
        } else {
            next(e);
        }
    }
    const token = createJWT(user); //possible expensive blocking code
    res.json({ token }); // {token : token } same as {token}
};

export const signIn = async (req, res, next) => {
    let user: User;
    try {
        console.log(req.body);
        user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            res.status(401);
            res.json({ message: "nope" });
            return;
        }
    } catch (e) {
        //db error
        next(e);
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.json({ message: "nope" });
        return;
    }

    const token = createJWT(user);

    res.json({
        token: token,
        name: user.instagram_uname,
        isAdmin: user.isAdmin,
        likes: (await getUserLikes(user.id)) || [],
    });
};
