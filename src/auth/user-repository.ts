import { Pool } from "pg";
import { NotFoundError } from "../error/errors";
import { UserRepository } from "./user-repository.type";
import { User } from "./user.type";

export class PgUserRepository implements UserRepository {
    constructor(private _dbPool: Pool) {}

    public getCredentials = async (
        email: string
    ): Promise<Pick<User, "id" | "email" | "password">> => {
        const result = await this._dbPool.query(
            "SELECT id, email, password FROM user_account WHERE email = $1 limit 1;",
            [email]
        );

        if (!result.rowCount) {
            throw new NotFoundError("User account not found");
        }

        const [credentials] = result.rows;

        return credentials;
    };

    public async create(): Promise<void> {
        return;
    }
}
