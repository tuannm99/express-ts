import { Request, Response } from 'express'
import { UserService } from '@services/user.service'

export class UserController {
  constructor(private readonly userService: UserService) {}

  public getAllUsers(req: Request, res: Response): void {
    const users = this.userService.getAllUsers()
    res.json(users)
  }

  public getUserById(req: Request, res: Response): void {
    const { id } = req.params
    const user = this.userService.getUserById(Number(id))
    if (user) {
      res.json(user)
    } else {
      res.status(404).send('User not found')
    }
  }

  public createUser(req: Request, res: Response): void {
    const user = req.body
    this.userService.createUser(user)
    res.send('User created successfully')
  }
}
