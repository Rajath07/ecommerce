import { Router } from "express"
import { createProduct, deleteProduct, getProductById, listProducts, updateProductById } from "controllers/product.controller"
import { adminMiddleware } from "middlewares/admin.middleware"
import authMiddleware from "middlewares/auth.middleware"
import { errorHandler } from "error-handler"

const productRouter: Router = Router()

productRouter.post('/', authMiddleware, adminMiddleware, errorHandler(createProduct))
productRouter.get('/:id', authMiddleware, errorHandler(getProductById))
productRouter.delete('/:id', authMiddleware, adminMiddleware, errorHandler(deleteProduct))
productRouter.put('/:id', authMiddleware, adminMiddleware, errorHandler(updateProductById))
productRouter.get('/', authMiddleware, errorHandler(listProducts))

export default productRouter