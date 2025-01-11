import { Request, Response } from "express";
import { authUser, createNewUser, getAllUsers } from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const newUser = await createNewUser(req.body);
    res.status(StatusCodes.CREATED).json(newUser);
}

export const loginUser = async (req: Request, res: Response) => {
    const user = await authUser(req.body)
    res.status(StatusCodes.OK).json(user)
}