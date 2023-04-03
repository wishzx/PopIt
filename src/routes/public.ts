import { feed } from "../handlers/feed";
import { createNewUser, signIn } from "../handlers/user";
import Router from "express";
import { errorHandler } from "../modules/middleware";

const router = Router();

router.post("/user", createNewUser); //TODO validate
router.post("/signin", signIn); //TODO validate
router.get("/feed", feed);

//PLEASE DO NOT PUT ROUTES BELOW THIS ERROR HANDLER
router.use(errorHandler);
export const publicRouter = router;
