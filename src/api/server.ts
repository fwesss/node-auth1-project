import express from 'express'
import { serve, setup } from 'swagger-ui-express'
import configureMiddleware from './api.middleware'
import apiRouter from './api.router'

import swaggerDocument from '../openapi.json'

const server = express()

configureMiddleware(server)

server.use('/docs', serve, setup(swaggerDocument))
server.use('/api', apiRouter)

export default server
