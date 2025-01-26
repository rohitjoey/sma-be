import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "empty" }),
});

export const updatePostSchema = z.object({
  id: z.string(),
  content:z.string().nullable().nullish(),
  like:z.boolean().nullable().default(false)
});

export const createPostDto = createPostSchema.extend({
  userId: z.string(),
});

export type CreatePostDto = z.infer<typeof createPostDto>;

export type UpdatePostDto = z.infer<typeof updatePostSchema>;
