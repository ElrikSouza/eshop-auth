import Joi, { Schema } from "joi";
import { ValidationError } from "../error/errors";

export const validateData = <T>(data: T, schema: Schema): T => {
    try {
        const validatedValue = Joi.attempt(data, schema);

        return validatedValue;
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            throw new ValidationError(error.message);
        }

        throw error;
    }
};
