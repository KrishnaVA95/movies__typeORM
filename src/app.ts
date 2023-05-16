import 'reflect-metadata'
import 'express-async-errors'
import express, { Application }  from 'express'
import { handleErrors } from './error'
import userRoutes from './routes/movies.routes'

const app: Application = express()
app.use(express.json())


app.use('/movies', userRoutes)

app.use(handleErrors)

export default app