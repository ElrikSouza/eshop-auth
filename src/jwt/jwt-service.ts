import { sign } from "jsonwebtoken";
import { envVars } from "../env";
import { TokenService } from "./token-service";

export const JwtService: TokenService = {
    issueToken: (data: { id: string }) => {
        return sign(data, envVars.JWT_SECRET, { expiresIn: "3d" });
    },
};
