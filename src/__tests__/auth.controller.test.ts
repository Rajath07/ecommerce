import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { signup } from "../controllers/auth.controller";
import type { Request, Response, NextFunction } from "express"
import { prisma } from 'index'
import { email } from "zod";
import { Role } from "@prisma/client";
import { BadRequestException } from "exceptions/badRequest";
import { InternalException } from "exceptions/internal-exception";
import { ErrorCode } from "exceptions/root";
import { error } from "node:console";
import { compareSync, hashSync } from "bcrypt"

jest.mock('index', () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn()
        }
    }
}))

jest.mock('bcrypt', () => ({
    hashSync: jest.fn(),
    compareSync: jest.fn()
}))

describe("signup", () => {
    let req: Request
    let res: Response
    let next: NextFunction

    const mockUser = {
        id: 1,
        name: "Rajath",
        email: "testemail@gmail.com",
        password: "1234",
        role: 'USER' as Role,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            body: {
                email: "testemail@gmail.com",
                name: "Rajath",
                password: "123456"
            }
        } as Request

        res = {
            send: jest.fn(),
        } as unknown as Response

        next = jest.fn()
    })

    it("should create a new user", async () => {
        jest.mocked(prisma.user.findUnique).mockResolvedValue(null);
        jest.mocked(prisma.user.create).mockResolvedValue(mockUser);
        jest.mocked(hashSync).mockReturnValue("hashed-password");

        await signup(req, res, next);

        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { email: "testemail@gmail.com" }
        })

        expect(hashSync).toHaveBeenCalledWith("123456", 10);

        expect(res.send).toHaveBeenCalledWith(mockUser);

    })

    it("should throw error if user already exists", async () => {
        const existingUser = {
            id: 1,
            name: "Rajath",
            email: "testemail@gmail.com",
            password: "1234",
            role: 'USER' as Role,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        jest.mocked(prisma.user.findUnique).mockResolvedValue(existingUser)

        await expect(signup(req, res, next)).rejects.toThrow(BadRequestException)

        expect(prisma.user.create).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
    })

    it("should throw error if prisma fails to create user", async () => {
        jest.mocked(prisma.user.findUnique).mockResolvedValue(null);
        jest.mocked(prisma.user.create).mockRejectedValue(
            new InternalException("Database error", ErrorCode.INTERNAL_SERVER_ERROR, error)
        );

        await expect(signup(req, res, next)).rejects.toThrow(InternalException);

        expect(res.send).not.toHaveBeenCalled;

    })
})