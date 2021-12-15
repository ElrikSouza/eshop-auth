import { GenericAuthController } from "./auth-controller.type";
import { Request, Response } from "express";
import { GenericAuthService } from "./auth-service.type";
import { wrapRoute } from "../route-handler/route-wrapper";

export class AuthController implements GenericAuthController {
    constructor(private _authService: GenericAuthService) {}

    public signIn = wrapRoute(async (req: Request, res: Response) => {
        const { token } = await this._authService.signIn(req.body);
        return res.status(200).send({ token });
    });

    public signUp = wrapRoute(async (req: Request, res: Response) => {
        await this._authService.signUp(req.body);
        return res.status(201).send({ message: "user has been created." });
    });
}
