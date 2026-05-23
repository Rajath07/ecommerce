import { z } from "zod"

export const createProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    tag: z.array(z.string())
})

export const updateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    tag: z.array(z.string()).optional()
})