export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface SignInData extends Pick<User, "email" | "password"> {}

export interface SignUpData
    extends Pick<User, "email" | "password" | "username"> {}
