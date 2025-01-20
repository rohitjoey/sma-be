import { StatusCodes } from "http-status-codes";
import { db } from "../db";
import { UserLogin, UserRegistration } from "../schema/user.schema";
import { CustomError } from "../utils/CustomError";
import { generateJWTToken } from "../utils/jwtUtils";
import { generatePassword, validatePassword } from "../utils/passwordUtils";

export const getAllUsers = async () => {
    return await db.user.findMany();
};

export const createNewUser = async (userData: UserRegistration) => {
    const hashedPassword = await generatePassword(userData.password);
    const user = await db.user.create({
        data: { email: userData.email, fullname: userData.fullName, gender: userData.gender, password: hashedPassword },
        omit: { password: true }
    });
    const token = generateJWTToken(user.id);
    // req.locals.tokenObject = tokenObject;
    return {
        success: true,
        user: user,
        token,
    };
}

export const authUser = async (loginData: UserLogin) => {

    const user = await db.user.findFirst({ where: { email: loginData.email } });
    if (!user) {
        throw new CustomError("Invalid Credentials", StatusCodes.UNAUTHORIZED, "Authentication Error")
    }
    const isValid = await validatePassword(loginData.password, user.password);
    if (!isValid) {
        throw new CustomError("Invalid Credentials", StatusCodes.UNAUTHORIZED, "Authentication Error")
    }

    // res.status(400).json("Welcome");
    const { password, ...userWithoutPassword } = user;
    const token = generateJWTToken(user.id);
    return {
        success: true,
        user: userWithoutPassword,
        token,
    };
}


export const getUserByIdService = async (userId: string) => {
    const user = await db.user.findFirst({ where: { id: userId }, omit: { password: true } });
    if (!user) {
        throw new CustomError("Auth Error", StatusCodes.UNAUTHORIZED, "Authentication Error")
    }
    return user
}