import { Router, Request, Response } from 'express'
import authRouter from '../auth/auth.router'

const router = Router()

router.use('/auth', authRouter)

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ apiStatus: 'Running' })
})

export default router
