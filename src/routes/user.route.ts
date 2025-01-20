import { Router } from "express";
import { createUser, getUserById, getUsers, loginUser } from "../controller/user.controller";
import { userLoginSchema, userRegistrationSchema } from "../schema/user.schema";
import { validateData } from "../middlewares/requestDataValidationMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import passport from "passport";
import { CustomError } from "../utils/CustomError";

// starts with /api/users
const userRouter = Router()
userRouter.get("/", getUsers)
userRouter.post("/register", validateData(userRegistrationSchema), asyncHandler(createUser))
userRouter.post("/login", validateData(userLoginSchema), asyncHandler(loginUser))
userRouter.get("/:userId", (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err: Error | null, user: any, info: any, status?: number) => {
        if (err || !user) {
            throw new CustomError("Not Authorized to perform this action", 401, "Authorization Error")
        } else {
            return next();
        }
    })(req, res, next)
}, asyncHandler(getUserById))

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