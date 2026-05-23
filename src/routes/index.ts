import { Router } from 'express'
import authRouter from './auth.routes'
import productRouter from './product.route'

const router: Router = Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)

export default router

