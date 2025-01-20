import { Router } from "express";
import { getUserById } from "../controller/user.controller";
import { asyncHandler } from "../utils/asyncHandler";

const postRouter = Router()
// postRouter.get("/", getPosts)
// postRouter.get("/:postId", asyncHandler(getUserById)) //TODO add auth middleware

export default postRouter;

