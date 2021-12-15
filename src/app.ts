import Express, { json } from "express";
import { AuthModule } from "./auth/auth-module";
import { errorMiddleware } from "./error/error-middleware";

export const app = Express();

app.use(json());
app.use(AuthModule);

// This middleware handles the errors of the whole API, and must be the last middleware to be used
app.use(errorMiddleware);
