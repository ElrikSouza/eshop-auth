import Joi from "joi";

export interface EnvVars {
    PORT: number;
    DB_CONNECTION_STRING: string;
    DB_CONNECTION_STRING_TEST: string;
    JWT_SECRET: string;
    NODE_ENV: string;
    MAX_DB_CLIENTS: number;
    BCRYPT_ROUNDS: number;
}

const unsafeEnvVars = {
    PORT: Number.parseInt(process.env.PORT ?? "4001"),
    BCRYPT_ROUNDS: Number.parseInt(process.env.BCRYPT_ROUNDS ?? "12"),
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_CONNECTION_STRING_TEST: process.env.DB_CONNECTION_STRING_TEST,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    MAX_DB_CLIENTS: Number.parseInt(process.env.MAX_DB_CLIENTS ?? "10"),
};

const validateEnv = (vars: object): EnvVars => {
    const envSchema = Joi.object({
        PORT: Joi.number().integer().required().min(1),
        BCRYPT_ROUNDS: Joi.number().integer().required().min(1),
        MAX_DB_CLIENTS: Joi.number().integer().required().min(1),
        DB_CONNECTION_STRING: Joi.string().required().uri(),
        DB_CONNECTION_STRING_TEST: Joi.string()
            .required()
            .uri()
            .disallow(Joi.ref("DB_CONNECTION_STRING")),
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
    });

    envSchema.validate(vars);
    return vars as EnvVars;
};

export const envVars = Object.freeze(validateEnv(unsafeEnvVars));
