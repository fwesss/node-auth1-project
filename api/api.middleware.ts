import {
  json,
  Application,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'

const sessionConfig = {
  name: 'tuna',
  secret: 'big poofer',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: Boolean(process.env.SECURE) || false,
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
}

const jsonSyntaxErrorHandler = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ error: 'JSON syntax error' })
  } else {
    next()
  }
}

export default (server: Application): void => {
  server.use(helmet())
  server.use(json())
  server.use(cors())
  server.use(session(sessionConfig))
  server.use(jsonSyntaxErrorHandler)
}
