import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import Users from '../resources/users/users.model'

const register = async (req: Request, res: Response): Promise<void> => {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 10)
  const hashedUser = { ...user, password: hash }

  try {
    const registeredUser = await Users.insert(hashedUser)
    res.status(201).json(registeredUser)
  } catch (error) {
    res.status(500).json({ message: `Operation failed`, error })
  }
}

type SessionRequest = Request & {
  session?: Express.Session
}

const login = async (req: SessionRequest, res: Response): Promise<void> => {
  const { username, password } = req.body

  try {
    const userToLogin = await Users.findBy({ username }).first()
    if (userToLogin && bcrypt.compareSync(password, userToLogin.password)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      req.session!.loggedIn = true
      res.status(200).json({ message: `Welcome ${username}!` })
    } else {
      res.status(401).json({ message: 'You shall not pass!' })
    }
  } catch (error) {
    res.status(500).json({ message: `Operation failed`, error })
  }
}

const logout = (req: Request, res: Response): void =>
  req.session &&
  req.session.destroy(error =>
    error
      ? res.json({ message: 'Error logging out', error })
      : res.json({ message: 'Goodbye!' })
  )

export default {
  register,
  login,
  logout,
}
