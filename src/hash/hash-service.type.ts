export interface HashService {
    hashData(data: string | Buffer): Promise<string>;
    compareToHash(data: string | Buffer, hash: string): Promise<boolean>;
}
