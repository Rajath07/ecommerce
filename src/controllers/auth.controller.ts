import { NextFunction, type Request, type Response } from 'express'
import { prisma } from 'index'
import { hashSync, compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'
import { ErrorCode } from 'exceptions/root'
import { BadRequestException } from 'exceptions/badRequest'
import { loginSchema, signUpSchema } from 'schemas/auth.schema'
import { UnprocessableEntity } from 'exceptions/validation'
import { NotFoundException } from 'exceptions/not-found'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = signUpSchema.parse(req.body);
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (user) throw new BadRequestException("User already Exists", ErrorCode.USER_EXISTS)

    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hashSync(password, 10)
        }
    })

    res.send(newUser)
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) throw new NotFoundException("User not found. Please signup", ErrorCode.USER_NOT_FOUND)

    if (!compareSync(password, user.password)) throw new BadRequestException("Wrong password", ErrorCode.WRONG_PASSWORD)

    const jwtToken = jwt.sign({
        userId: user.id
    }, JWT_SECRET!)

    res.send({ ...user, jwtToken })
}