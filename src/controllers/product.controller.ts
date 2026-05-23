import { BadRequestException } from "exceptions/badRequest"
import { InternalException } from "exceptions/internal-exception"
import { NotFoundException } from "exceptions/not-found"
import { ErrorCode } from "exceptions/root"
import { NextFunction, type Request, type Response } from "express"
import { prisma } from "index"
import { createProductSchema, updateProductSchema } from "schemas/product.schema"

export const createProduct = async (req: Request, res: Response) => {

    const product = await createProductSchema.parse(req.body)
    const createdProduct = await prisma.product.create({
        data: {
            ...product,
            tag: product.tag.join(',')
        }
    })

    res.json(createdProduct)
}

export const updateProductById = async (req: Request, res: Response) => {
    const product = updateProductSchema.parse(req.body)
    const productId = Number(req.params.id)

    if (!productId) throw new BadRequestException('Product ID needed', ErrorCode.UNPROCESSABLE_ENTITY)

    const updatedProduct = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            ...product,
            tag: product.tag?.join(',')
        }
    })

    res.json(updatedProduct)


}

export const deleteProduct = async (req: Request, res: Response) => {
    const productId = Number(req.params.id)

    if (!productId) throw new BadRequestException('Product ID needed', ErrorCode.UNPROCESSABLE_ENTITY)

    const deletedProduct = await prisma.product.delete({
        where: {
            id: productId
        }
    })

    res.json(deletedProduct)


}

export const listProducts = async (req: Request, res: Response) => {

    const count = await prisma.product.count()
    const products = await prisma.product.findMany({
        skip: Number(req.query.skip) || 0,
        take: 5
    })

    res.json({
        count,
        data: products
    })

}

export const getProductById = async (req: Request, res: Response) => {
    const productId = req.params.id
    if (!productId) throw new BadRequestException('Product ID needed', ErrorCode.UNPROCESSABLE_ENTITY)
    const product = await prisma.product.findFirst({
        where: {
            id: Number(productId)
        }
    })

    if (!product) throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)

    res.json(product)
}