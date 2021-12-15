import { compare, hash } from "bcrypt";
import { envVars } from "../env";
import { HashService } from "./hash-service.type";

export const BcryptHashService: HashService = {
    compareToHash: async (data: string | Buffer, hash: string) => {
        return compare(data, hash);
    },

    hashData: async (data: string | Buffer) => {
        return hash(data, envVars.BCRYPT_ROUNDS);
    },
};
