import { ErrorCode } from 'exceptions/root'
import { UnauthorizedException } from 'exceptions/unauthorized'
import { NextFunction, type Request, type Response } from 'express'

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (user) {
        if (user.role === 'ADMIN') {
            next()
        }
        else {
            console.log('Code entered here')
            next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        }

    } else {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }

}