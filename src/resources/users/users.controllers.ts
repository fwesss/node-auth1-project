import { Request, Response, NextFunction } from 'express'
import { find } from './users.model'

const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await find()
    res.status(200).json(users)
  } catch (error) {
    next(new Error('Could not retrieve users'))
  }
}

export default getUsers
