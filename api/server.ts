import express from 'express'
import configureMiddleware from './middleware'

const server = express()

configureMiddleware(server)

export default server
