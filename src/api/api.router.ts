import { Router } from 'express'
import authRouter from '../auth/auth.router'
import usersRouter from '../resources/users/users.router'
import checkAuth from '../auth/middleware/authorization'
import controllers from './api.controllers'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/restricted', checkAuth)

router.route('/').get(controllers.apiRoot)

export default router
