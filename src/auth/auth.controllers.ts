/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import Users from '../resources/users/users.model'
import guaranteedPromise from '../utils/guaranteedPromise'
import {
  UnauthorizedError,
  DatabaseError,
} from '../server/middleware/errorHandler'

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 10)
  const hashedUser = { ...user, password: hash }

  const registeredUser = await guaranteedPromise(Users.insert(hashedUser))

  return registeredUser.ok
    ? res.status(201).json(registeredUser.data)
    : next(
        new DatabaseError({
          message: 'Registration failed',
          dbMessage: registeredUser.error,
        })
      )
}

type SessionRequest = Request & {
  session?: Express.Session
}

const login = async (
  req: SessionRequest | Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body

  try {
    const userToLogin = await Users.findBy({ username }).first()

    if (userToLogin && bcrypt.compareSync(password, userToLogin.password)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      req.session!.loggedIn = true
      res.status(200).json({ message: `Welcome ${username}!` })
    } else {
      next(new UnauthorizedError({ message: 'You shall not pass!' }))
    }
  } catch (error) {
    next(
      new DatabaseError({
        message: 'Login failed',
        dbMessage: error,
      })
    )
  }
}

const logout = (req: Request, res: Response, next: NextFunction): void =>
  req.session &&
  req.session.destroy(error =>
    error
      ? next(new Error('Logout failed'))
      : res.status(201).json({ message: 'Successfully logged out!' })
  )

export default {
  register,
  login,
  logout,
}
