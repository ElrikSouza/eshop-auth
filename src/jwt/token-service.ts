export interface TokenService {
    issueToken(data: { id: string }): string;
}
