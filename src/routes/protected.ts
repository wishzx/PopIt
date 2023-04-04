import Router from "express";
import { body, param } from "express-validator";
import { createContentbyUser } from "../handlers/content";
import { errorHandler, handleInputErrors } from "../modules/middleware";
import { createLike, removeLike } from "../handlers/like";
import { getChallengeFromUser, getChallenges } from "../handlers/challenge";

const router = Router();

router.post(
    "/content/:id",
    body("image_url").exists().isURL().isLength({ max: 2048 }),
    handleInputErrors,
    createContentbyUser
);

router.post(
    "/like",
    body("content_id").exists().isString(),
    handleInputErrors,
    createLike
);

router.delete(
    "/like",
    body("content_id").exists().isString(),
    handleInputErrors,
    removeLike
);

router.get("/challenge", getChallenges);
router.get("/challengeUser/:id", getChallengeFromUser);

//PLEASE DO NOT PUT ROUTES BELOW THIS ERROR HANDLER
router.use(errorHandler);
export const protectedRouter = router;
