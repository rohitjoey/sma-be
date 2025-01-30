import { StatusCodes } from "http-status-codes";
import { db } from "../db";
import { CreatePostDto, UpdatePostDto } from "../dto/post.dto";
import { CustomError } from "../utils/CustomError";
import { Prisma } from "@prisma/client";
import { PostGetQuery } from "../controller/post.controller";

export const getAllPosts = async (query: PostGetQuery) => {
  const searchTerm = query.search;
  // const cursorId = query.cursor;

  let whereOperator: Prisma.PostWhereInput = {};
  if (query.search) {
    whereOperator["OR"] = [
      { content: { contains: searchTerm, mode: "insensitive" } },
      { User: { fullname: { contains: searchTerm, mode: "insensitive" } } },
    ];
  }
  const res = await db.post.findMany({
    where: whereOperator,
    orderBy: { createdAt: "desc" },
    // cursor: cursorId ? { id: cursorId } : undefined,
    // skip: cursorId ? 1 : 0,
    // take: 11,
    include: { User: { omit: { password: true } } },
  });

  const lastPost = res.length >= 10 ? res[res.length - 1].id : null;

  // return { posts: res, nextCursor: lastPost };
  return res;
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
