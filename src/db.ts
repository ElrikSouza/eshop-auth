import { Pool } from "pg";
import { envVars } from "./env";

const nodeEnv = envVars.NODE_ENV.toLowerCase();

const connectionString =
    nodeEnv === "production" ? envVars.DB_CONNECTION_STRING : envVars.DB_CONNECTION_STRING_TEST;

const SSL = nodeEnv !== "test" && nodeEnv !== "local";

const config = {
    connectionString,
    max: envVars.MAX_DB_CLIENTS,
    ssl: SSL,
    allowExitOnIdle: true,
};

export const db = new Pool(config);
