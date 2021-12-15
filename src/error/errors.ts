import { ApiError } from "./api-error";

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ValidationError extends ApiError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class ConflictError extends ApiError {
    constructor(message: string) {
        super(message, 409);
    }
}
