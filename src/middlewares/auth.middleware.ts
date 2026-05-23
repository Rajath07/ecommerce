import { ErrorCode } from 'exceptions/root'
import { UnauthorizedException } from 'exceptions/unauthorized'
import { NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'
import { prisma } from 'index'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new UnauthorizedException('Auth Token missing', ErrorCode.UNAUTHORIZED))
        }

        const token = authHeader?.split(" ")[1]
        if (!token) return next(new UnauthorizedException('Token is empty', ErrorCode.UNAUTHORIZED))

        const payload = jwt.verify(token, JWT_SECRET!) as any
        const user = await prisma.user.findFirst({
            where: {
                id: payload.userId
            }
        })

        if (!user) return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))

        req.user = user
        next()
    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))

    }
}

export default authMiddleware