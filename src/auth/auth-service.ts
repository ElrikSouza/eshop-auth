import { compareSync } from "bcrypt";
import { ForbiddenError } from "../error/errors";
import { HashService } from "../hash/hash-service.type";
import { TokenService } from "../jwt/token-service";
import { validateData } from "../validation/validate";
import { GenericAuthService } from "./auth-service.type";
import { UserRepository } from "./user-repository.type";
import { signInSchema, signUpSchema } from "./user-validation";
import { SignInData, SignUpData } from "./user.type";

export class AuthService implements GenericAuthService {
    constructor(
        private _userRepo: UserRepository,
        private _tokenService: TokenService,
        private _hashService: HashService
    ) {}

    public signIn = async (signInInfo: SignInData): Promise<{ token: string }> => {
        const validatedSignInInfo = validateData<SignInData>(signInInfo, signInSchema);
        const userCredentials = await this._userRepo.getCredentials(validatedSignInInfo.email);
        const doPasswordsMatch = await this._hashService.compareToHash(
            validatedSignInInfo.password,
            userCredentials.password
        );

        if (!doPasswordsMatch) {
            throw new ForbiddenError("Wrong password");
        }

        const token = this._tokenService.issueToken({ id: userCredentials.id });

        return { token };
    };

    public signUp = async (signUpInfo: SignUpData): Promise<void> => {
        const validatedUserInfo = validateData<SignUpData>(signUpInfo, signUpSchema);

        await this._userRepo.create({
            ...validatedUserInfo,
            password: await this._hashService.hashData(validatedUserInfo.password),
        });

        return;
    };
}
