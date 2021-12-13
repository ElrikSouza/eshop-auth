import Express, { json } from "express";

export const app = Express();

app.use(json());
