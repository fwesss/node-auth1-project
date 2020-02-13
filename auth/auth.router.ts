import { Router } from 'express'
import controllers from './auth.controllers'
import validateUser from './middleware/validation'

const router = Router()

router.route('/register').post(validateUser, controllers.register)
router.route('/login').post(validateUser, controllers.login)

export default router
