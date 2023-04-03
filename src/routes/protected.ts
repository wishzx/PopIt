import Router from "express";
import { body } from "express-validator";
import { createContentbyUser } from "../handlers/content";
import { protect } from "../modules/auth";
import { errorHandler, handleInputErrors } from "../modules/middleware";
import { createLike, removeLike } from "../handlers/like";

const router = Router();

router.post(
    "/content",
    body("image_url").exists().isURL().isLength({ max: 2048 }),
    body("challenge_id").exists().isString(),
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

//PLEASE DO NOT PUT ROUTES BELOW THIS ERROR HANDLER
router.use(errorHandler);
export const protectedRouter = router;
