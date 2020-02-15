/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express'
import { ValidationError } from '../../utils/validator'

export class UnauthorizedError extends Error {
  constructor(error: { message: string }) {
    super()
    this.name = 'UnauthorizedError'
    this.message = error.message
    Error.call(this, error.message)
    Error.captureStackTrace(this, this.constructor)
  }
}

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(error)
  } else if (error instanceof SyntaxError) {
    res.status(400).json({ message: error.message })
  } else if (error instanceof ValidationError) {
    res
      .status(400)
      .json({ message: error.message, errors: error.invalidations })
  } else if (error instanceof UnauthorizedError) {
    res.status(401).json({ message: error.message })
  } else {
    console.error({
      message: error.message,
      stack: error.stack,
    })
    res.status(500).json({
      message: error.message,
      ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
    })
  }
}

export default errorHandler
