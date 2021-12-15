import { Router } from "express";
import { db } from "../db";
import { BcryptHashService } from "../hash/bcrypt-hash-service";
import { JwtService } from "../jwt/jwt-service";
import { AuthController } from "./auth-controller";
import { AuthService } from "./auth-service";
import { PgUserRepository } from "./user-repository";

const userRepo = new PgUserRepository(db);
const authService = new AuthService(userRepo, JwtService, BcryptHashService);
const authController = new AuthController(authService);

export const AuthModule = Router();

AuthModule.post("/auth/sign-in", authController.signIn);
