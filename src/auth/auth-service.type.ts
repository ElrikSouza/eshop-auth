import { SignInData } from "./user.type";

export interface GenericAuthService {
    signIn(signInInfo: SignInData): Promise<{ token: string }>;
}
