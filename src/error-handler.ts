import { BadRequestException } from "exceptions/badRequest"
import { InternalException } from "exceptions/internal-exception"
import { ErrorCode, HttpException } from "exceptions/root"
import { UnprocessableEntity } from "exceptions/validation"
import { NextFunction, type Request, type Response } from "express"
import { ZodError } from 'zod'

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error) {
            let exception: HttpException
            if (error instanceof HttpException) {
                exception = error
            } else if (error instanceof ZodError) {
                exception = new UnprocessableEntity('Validation failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
            } else {
                exception = new InternalException('Something went wrong!', ErrorCode.INTERNAL_SERVER_ERROR, error)
            }
            next(exception)
        }

    }

}