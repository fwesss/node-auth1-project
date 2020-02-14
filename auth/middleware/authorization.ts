import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'You shall not pass!' })
  }
}
