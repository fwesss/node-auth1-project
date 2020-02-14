import { Request, Response, NextFunction } from 'express'

export default (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response =>
  req.session && req.session.loggedIn
    ? next()
    : res.status(401).json({ message: 'You shall not pass!' })
