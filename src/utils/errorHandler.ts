import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // console.error("Error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002": // Unique constraint failed
                res.status(StatusCodes.CONFLICT).json({
                    error: "Conflict",
                    message: `Unique constraint failed on ${error.meta?.target || "unknown field"}`,
                });
                return
            case "P2025": // Record not found
                res.status(StatusCodes.NOT_FOUND).json({
                    error: "Not Found",
                    message: "The requested resource could not be found.",
                });
                return
            default:
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: "Internal Server Error",
                    message: "An unexpected error occurred.",
                });
                return
        }
    }

    // Handle Zod validation errors (if you're using Zod for validation)
    if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', message: errorMessages });
        return
    }



    // Handle general errors
    if (error.status && error.message) {
        res.status(error.status).json({
            error: error.name || "Error",
            message: error.message,
        });
        return
    }

    // Catch-all for unexpected errors
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
    });
};