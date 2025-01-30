import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createNewPost,
  deletePostService,
  getAllPosts,
  updatePostService,
} from "../services/post.service";

export interface PostGetQuery {
  cursor: string | undefined;
  search: string | undefined;
}

export const getPosts = async (
  req: Request<{}, {}, {}, PostGetQuery>,
  res: Response
) => {
  const posts = await getAllPosts(req.query);
  res.status(StatusCodes.OK).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const userId = req?.user?.id;
  const newPost = await createNewPost({ ...req.body, userId });
  res.status(StatusCodes.CREATED).json(newPost);
};

export const updatePostController = async (req: Request, res: Response) => {
  const updatedData = await updatePostService(req.body, req.user?.id as string);
  res.status(StatusCodes.ACCEPTED).json(updatedData);
};

export const deletePostController = async (req: Request, res: Response) => {
  const updatedData = await deletePostService(
    req.params.postId,
    req.user?.id as string
  );
  res
    .status(StatusCodes.ACCEPTED)
    .json({ message: "Post deleted successfully" });
};
