import Joi from "joi";

const commonFields = {
    email: Joi.string().email().required().max(255),
    password: Joi.string().required().max(72).min(8),
};

export const signInSchema = Joi.object({
    ...commonFields,
});

export const signUpSchema = Joi.object({
    ...commonFields,
    username: Joi.string().required().min(2).max(50),
});
