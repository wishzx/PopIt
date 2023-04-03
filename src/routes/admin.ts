import { Gender } from "@prisma/client";
import { Router } from "express";
import { body, validationResult } from "express-validator"; // https://express-validator.github.io/docs/
import {
    createChallenge,
    deleteChallenge,
    getChallenges,
    getOneChallenge,
    updateChallenge,
} from "../handlers/challenge";
import {
    createContent,
    deleteContent,
    getContent,
    getOneContent,
    updateContent,
} from "../handlers/content";
import { errorHandler, handleInputErrors } from "../modules/middleware";

const router = Router();

//gRPc->trpc for typegeneration internal api for frontend
// REST for external API also because you monetize on the number of calls

// in CRUD i use put even if it's technically a patch

/**
 * User
 */
router.get("/user", (req, res) => {
    res.send("you are auth");
});
router.get("/user/:id", () => {});
router.post("/user/", (req, res) => {
    res.status(410).send("use the /signin endpoint instead");
});
router.put(
    "/user/:id",
    body("email").optional().isEmail(),
    body("instagram_uname").optional().isLength({ max: 64 }).isString(),
    body("gender").optional().isIn(Object.values(Gender)),
    handleInputErrors,
    (req, res) => {}
);
router.delete("/user/:id", () => {});

/**
 * Challenge
 */
router.get("/challenge", getChallenges);
router.get("/challenge/:id", getOneChallenge);
router.post(
    "/challenge/",
    body("name").exists().isLength({ max: 255 }),
    body("tags").exists().isLength({ max: 16 }),
    handleInputErrors,
    createChallenge
);
router.put(
    "/challenge/:id",
    body("name").optional().isLength({ max: 255 }),
    body("tags").optional().isLength({ max: 16 }),
    handleInputErrors,
    updateChallenge
);
router.delete("/challenge/:id", deleteChallenge);

/**
 * Content
 */
router.get("/content", getContent);
router.get("/content/:id", getOneContent);
router.post(
    "/content/",
    body("image_url").exists().isURL().isLength({ max: 2048 }),
    body("challenge_id").exists().isString(),
    body("user_id").exists().isString(),
    handleInputErrors,
    createContent
);
router.put(
    "/content/:id",
    body("image_url").optional().isURL().isLength({ max: 2048 }),
    body("likes").optional().isInt(),
    handleInputErrors,
    updateContent
);
router.delete("/content/:id", deleteContent);

//PLEASE DO NOT PUT ROUTES BELOW THIS ERROR HANDLER
router.use(errorHandler);
export const adminRouter = router;

