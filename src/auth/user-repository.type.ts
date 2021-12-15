import { User } from "./user.type";

export interface UserRepository {
    create(): Promise<void>;
    getCredentials(email: string): Promise<Pick<User, "id" | "email" | "password">>;
}
