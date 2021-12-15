import { Pool, DatabaseError } from "pg";
import { v4 as uuid } from "uuid";
import { ConflictError, NotFoundError } from "../error/errors";
import { UserRepository } from "./user-repository.type";
import { SignUpData, User } from "./user.type";

const userToArray = (user: SignUpData) => [uuid(), user.username, user.email, user.password];

const UNIQUE_CONSTRAINT_VIOLATION = "23505";

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

    public create = async (user: SignUpData): Promise<void> => {
        try {
            await this._dbPool.query(
                "INSERT INTO user_account(id, username, email, password) values ($1, $2, $3, $4);",
                userToArray(user)
            );
        } catch (error) {
            if (error instanceof DatabaseError && error.code === UNIQUE_CONSTRAINT_VIOLATION) {
                throw new ConflictError("Email already in use");
            }

            throw error;
        }
    };
}
