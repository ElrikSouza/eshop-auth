import { Pool } from "pg";
import { envVars } from "./env";

const connectionString =
    envVars.NODE_ENV === "PRODUCTION"
        ? envVars.DB_CONNECTION_STRING
        : envVars.DB_CONNECTION_STRING_TEST;

const SSL = envVars.NODE_ENV !== "TEST" && envVars.NODE_ENV !== "LOCAL";

const config = {
    connectionString,
    max: envVars.MAX_DB_CLIENTS,
    ssl: SSL,
    allowExitOnIdle: true,
};

export const db = new Pool(config);
