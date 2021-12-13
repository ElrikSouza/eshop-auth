import supertest from "supertest";
import { app } from "../src/app";
import { random, internet } from "faker";
import { db } from "../src/db";
import { hashSync } from "bcrypt";

const notFoundUser = {
    email: "notfound@example.com",
    password: random.alphaNumeric(10),
};

const userAlreadyExists = {
    email: "alreadyexists@example.com",
    password: hashSync("12345678", 1),
    username: "Yi test",
};

describe("Authentication api", () => {
    const testApp = supertest(app);

    beforeAll(async () => {
        await db.query("DELETE FROM user;");
        await db.query(
            "INSERT INTO user(username, email, password) values ($1, $2, $3)",
            [
                userAlreadyExists.username,
                userAlreadyExists.email,
                userAlreadyExists.password,
            ]
        );
    });

    describe("Sign in route", () => {
        const signIn = () => testApp.post("/auth/sign-in");

        it("should return 404 if the user does not exist", async () => {
            const result = await signIn().send(notFoundUser);

            expect(result.statusCode).toBe(404);
        });

        it("should return 200 and a token if the request was successful", async () => {
            const { body, statusCode } = await signIn().send({
                email: userAlreadyExists.email,
                password: "12345678",
            });

            expect(statusCode).toBe(200);
            expect(body.token).toBeDefined();
        });

        it("should return 403 if the password is wrong", async () => {
            const { body, statusCode } = await signIn().send({
                email: userAlreadyExists.email,
                password: "012345678",
            });

            expect(statusCode).toBe(403);
            expect(body.token).toBeUndefined();
        });
    });

    describe("Sign up route", () => {
        const signUp = testApp.post("/auth/sign-up");

        it("should return 409 if the email is already being used", async () => {
            const { statusCode } = await signUp.send(userAlreadyExists);
            expect(statusCode).toBe(409);
        });

        it("should return 201 if the request succeded", async () => {
            const { statusCode } = await signUp.send({
                email: internet.exampleEmail(),
                password: internet.password(10),
                username: internet.userName(),
            });

            expect(statusCode).toBe(201);
        });

        it("should return 400 if there is a validation error", async () => {
            const { statusCode } = await signUp.send({
                email: internet.exampleEmail(),
                password: internet.password(3),
                username: internet.userName(),
            });

            expect(statusCode).toBe(400);
        });
    });
});
