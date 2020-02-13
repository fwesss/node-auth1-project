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
  server.use(jsonSyntaxErrorHandler)
}
