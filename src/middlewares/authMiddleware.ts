import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { CustomError } from "../utils/CustomError";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (
      err: Error | null,
      user: Express.User | undefined,
      info: any,
      status?: number
    ) => {
      if (err || !user) {
        throw new CustomError(
          "Not Authorized to perform this action",
          401,
          "Authorization Error"
        );
      } else {
        req.user = user;
        return next();
      }
    }
  )(req, res, next);
};
