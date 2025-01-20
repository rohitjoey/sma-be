import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string(),
  likesCount: z.number().default(0),
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string(),
});

export const createPostDto = createPostSchema.extend({
  userId: z.string(),
});

export type CreatePostDto = z.infer<typeof createPostDto>;

export type UpdatePostDto = CreatePostDto & { id: string };
