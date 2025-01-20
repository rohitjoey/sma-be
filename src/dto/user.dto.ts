import { z } from "zod";

const genderEnum = z.enum(["male", "female", "other"]);

export const UserResponseDto = z.object({
  id: z.string(),
  fullname: z.string(),
  email: z.string(),
  gender: genderEnum,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userRegistrationSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  gender: genderEnum,
});

export type UserRegistration = z.infer<typeof userRegistrationSchema>;

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserLogin = z.infer<typeof userLoginSchema>;
