# E-shop auth

This is a microservice in charge of the authentication of e-shop.

The API handles the sign in and sign up routes of the app.

## Configuration (ENV VARS)

    - PORT (default: 4001)
    - DB_CONNECTION_STRING
    - DB_CONNECTION_STRING_TEST
    - JWT_SECRET

## Routes

### Sign in

```
POST /auth/sign-in
```

email

- must be a valid email
- max length: 255

password

- min length: 8
- max length: 72

```typescript
payload: {
  email: string;
  password: string;
}

response: {
  token: string;
}
```

The token is a jwt without a Bearer prefix

- Returns 200 if successful
- Returns 404 if the user does not exist
- Returns 403 if the password is wrong

### Sign up

```
POST /auth/sign-up
```

username

- min length: 2
- max length: 40
- cannot be null

email

- must be a valid email
- max length: 255
- cannot be null

password

- min length: 8
- max length: 72
- cannot be null

#### Responses

- Returns 201 if successful
- Returns 400 if the email is already in use (or if the data is invalid)
