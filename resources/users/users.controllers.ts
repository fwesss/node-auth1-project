import { Request, Response } from 'express'
import { find } from './users.model'

export default async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: `Operation failed`, error })
  }
}
