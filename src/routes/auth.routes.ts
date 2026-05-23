import { signup, login } from 'controllers/auth.controller'
import { errorHandler } from 'error-handler'
import { Router } from 'express'
import authMiddleware from 'middlewares/auth.middleware'

const router: Router = Router()

router.post('/signup', errorHandler(signup))
router.post('/login', errorHandler(login))

export default router