import { SignInData, SignUpData } from "./user.type";

export interface GenericAuthService {
    signIn(signInInfo: SignInData): Promise<{ token: string }>;
    signUp(signUpInfo: SignUpData): Promise<void>;
}
