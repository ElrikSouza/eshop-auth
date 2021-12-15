import { NextFunction, Request, Response } from "express";
import { ApiError } from "./api-error";

export const errorMiddleware = async (
    error: unknown,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).send({ message: error.message });
    }

    return res.status(500);
};
