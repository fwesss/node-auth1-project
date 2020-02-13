import express from 'express'
import configureMiddleware from './api.middleware'
import apiRouter from './api.router'

const server = express()

configureMiddleware(server)

server.use('/api', apiRouter)

export default server
