import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import Users from '../resources/users/users.model'

const register = async (req: Request, res: Response): Promise<void> => {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  try {
    const registeredUser = await Users.insert(user)
    res.status(201).json(registeredUser)
  } catch (error) {
    res.status(500).json({ message: `Operation failed`, error })
  }
}

const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body

  try {
    const userToLogin = await Users.findBy({ username }).first()
    if (userToLogin && bcrypt.compareSync(password, userToLogin.password)) {
      res.status(200).json({ message: `Welcome ${username}!` })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ message: `Operation failed`, error })
  }
}

export default {
  register,
  login,
}
