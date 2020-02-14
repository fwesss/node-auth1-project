import { Router, Request, Response } from 'express'
import authRouter from '../auth/auth.router'
import usersRouter from '../resources/users/users.router'
import checkAuth from '../auth/middleware/authorization'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/restricted', checkAuth)

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ apiStatus: 'Running' })
})

export default router
