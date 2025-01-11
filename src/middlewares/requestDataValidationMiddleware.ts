import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';


export function validateData<T extends ZodObject<any>>(schema: T) {
    return (req: Request, res: Response, next: NextFunction) => {
        schema.parse(req.body);
        next();
    };
}