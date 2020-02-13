import { Router } from 'express'
import controllers from './auth.controllers'

const router = Router()

router.route('/register').post(controllers.register)
router.route('/login').post(controllers.login)

export default router
