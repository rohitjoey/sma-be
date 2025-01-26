import { StatusCodes } from "http-status-codes";
import { db } from "../db";
import { CreatePostDto, UpdatePostDto } from "../dto/post.dto";
import { CustomError } from "../utils/CustomError";
import { ParsedQs } from "qs";
import { Prisma } from "@prisma/client";

export const getAllPosts = async (query: ParsedQs) => {
  let searchTerm: string | undefined;
  if (typeof query.search === "string") {
    searchTerm = query.search;
  } else {
    searchTerm = undefined;
  }
  let whereOperator: Prisma.PostWhereInput = {};
  if (query.search) {
    whereOperator["OR"] = [
      { content: { contains: searchTerm, mode: "insensitive" } },
      { User: { fullname: { contains: searchTerm, mode: "insensitive" } } },
    ];
  }
  return  await db.post.findMany({
    where: whereOperator,
    orderBy: { createdAt: "desc" },
    include: { User: { omit: { password: true } } },
    take: 11,
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
