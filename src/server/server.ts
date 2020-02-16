import express, { json } from 'express'
import { serve, setup } from 'swagger-ui-express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import sessionConfig from './middleware/sessionStore'
import errorHandler from './middleware/errorHandler'

import apiRouter from '../api/api.router'

import swaggerDocument from '../openapi.json'

const server = express()

server.use(helmet())
server.use(morgan('dev'))
server.use(json())
server.use(cors())
server.use(session(sessionConfig))

server.use('/docs', serve, setup(swaggerDocument))
server.use('/api', apiRouter)

server.use(errorHandler)

export default server
