export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    error: any
    statusCode: number

    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.error = error
        this.statusCode = statusCode
    }
}

export enum ErrorCode {
    USER_EXISTS = 1000,
    USER_NOT_FOUND = 1001,
    WRONG_PASSWORD = 1002,
    UNPROCESSABLE_ENTITY = 1003,
    INTERNAL_SERVER_ERROR = 1004,
    UNAUTHORIZED = 1005,
    PRODUCT_NOT_FOUND = 2001
}