import { StatusCodes } from "http-status-codes";
import { db } from "../db";
import { CreatePostDto, UpdatePostDto } from "../dto/post.dto";
import { CustomError } from "../utils/CustomError";

export const getAllPosts = async () => {
  return await db.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { User: { omit: { password: true } } },
    take: 10,
  });
};

export const createNewPost = async (newPostData: CreatePostDto) => {
  return await db.post.create({ data: newPostData });
};

export const updatePostService = async (
  updateData: UpdatePostDto,
  userId: string
) => {
  const post = await db.post.findFirst({ where: { id: updateData.id } });

  if (!post) {
    throw new CustomError("Post not found", StatusCodes.NOT_FOUND, "NOT FOUND");
  }
  if (post?.userId !== userId && !updateData.like) {
    throw new CustomError(
      "Not Authorized to update",
      StatusCodes.UNAUTHORIZED,
      "Not Authorized"
    );
  }

  if (updateData.like) {
    post.likesCount = post.likesCount + 1;
  }
  if (updateData.content) {
    post.content = updateData.content;
  }

  return await db.post.update({
    where: { id: updateData.id },
    data: post,
  });
};

export const deletePostService = async (postId: string, userId: string) => {
  const post = await db.post.findFirst({ where: { id: postId } });

  if (!post) {
    throw new CustomError("Post not found", StatusCodes.NOT_FOUND, "NOT FOUND");
  }
  if (post?.userId !== userId) {
    throw new CustomError(
      "Not Authorized to update",
      StatusCodes.UNAUTHORIZED,
      "Not Authorized"
    );
  }

  return await db.post.delete({
    where: { id: postId },
  });
};
