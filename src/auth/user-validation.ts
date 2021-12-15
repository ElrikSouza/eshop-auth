import Joi from "joi";

export const signInSchema = Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(72).min(8),
});
