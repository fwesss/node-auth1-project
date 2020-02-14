import { Request, Response, NextFunction } from 'express'
import Validation from 'folktale/validation'
import { validator, didItValidate, Matcher } from '../../utils/validator'

const { Success } = Validation

const hasBody = (req: Request): boolean => !!req.body
const hasUsername = (req: Request): boolean => !!req.body.username
const hasPassword = (req: Request): boolean => !!req.body.password

const bodyValidator = validator('Missing user data', hasBody)
const usernameValidator = validator('Missing username', hasUsername)
const passwordValidator = validator('Missing password', hasPassword)

const userValidationResult = (req: Request): Matcher =>
  Success()
    .concat(bodyValidator(req))
    .concat(usernameValidator(req))
    .concat(passwordValidator(req))

export default (req: Request, res: Response, next: NextFunction): void => {
  const didUserValidate = didItValidate(userValidationResult(req))

  if (!didUserValidate) {
    res.status(400).json({ errors: userValidationResult(req).value })
  } else {
    next()
  }
}
