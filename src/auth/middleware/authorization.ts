import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../../server/middleware/errorHandler'

const checkAuth = (req: Request, _res: Response, next: NextFunction): void =>
  req.session && req.session.loggedIn
    ? next()
    : next(new UnauthorizedError({ message: 'You shall not pass!' }))

export default checkAuth
