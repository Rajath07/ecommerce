import express, { type Express, type Request, type Response} from 'express'
import { PrismaClient } from '@prisma/client'
import { PORT } from './constants'
import routes from './routes'
import { errorMiddleware } from 'middlewares/erorrs'
const app: Express = express()

app.use(express.json())

app.use('/api', routes)

export const prisma = new PrismaClient()

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log("E-Commerce App started on port:", PORT)
})