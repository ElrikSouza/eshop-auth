import { SignUpData, User } from "./user.type";

export interface UserRepository {
    create(user: SignUpData): Promise<void>;
    getCredentials(email: string): Promise<Pick<User, "id" | "email" | "password">>;
}
