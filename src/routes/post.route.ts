import { Router } from "express";
import {
  createPost,
  deletePostController,
  getPosts,
  updatePostController,
} from "../controller/post.controller";
import { createPostSchema, updatePostSchema } from "../dto/post.dto";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { validateData } from "../middlewares/requestDataValidationMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

const postRouter = Router();
postRouter
  .route("/")
  .get(AuthMiddleware, asyncHandler(getPosts))
  .post(
    AuthMiddleware,
    validateData(createPostSchema),
    asyncHandler(createPost)
  )
  .patch(
    AuthMiddleware,
    validateData(updatePostSchema),
    asyncHandler(updatePostController)
  );

postRouter.delete(
  "/:postId",
  AuthMiddleware,
  asyncHandler(deletePostController)
);

export default postRouter;
