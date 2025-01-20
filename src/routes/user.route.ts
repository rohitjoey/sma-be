import { Router } from "express";
import { createUser, getUserById, getUsers, loginUser } from "../controller/user.controller";
import { userLoginSchema, userRegistrationSchema } from "../dto/user.dto";
import { validateData } from "../middlewares/requestDataValidationMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import passport from "passport";
import { CustomError } from "../utils/CustomError";
import { AuthMiddleware } from "../middlewares/authMiddleware";

// starts with /api/users
const userRouter = Router()
userRouter.get("/", getUsers)
userRouter.post("/register", validateData(userRegistrationSchema), asyncHandler(createUser))
userRouter.post("/login", validateData(userLoginSchema), asyncHandler(loginUser))
userRouter.get("/:userId", AuthMiddleware, asyncHandler(getUserById))

export default userRouter;


// app.route('/book')
//   .get((req, res) => {
//     res.send('Get a random book')
//   })
//   .post((req, res) => {
//     res.send('Add a book')
//   })
//   .put((req, res) => {
//     res.send('Update the book')
//   })