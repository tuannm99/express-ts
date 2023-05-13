import { HTTP_METHOD, IRouter } from '@libs/application'
import { UserController } from '@controllers/user.controller'
import { UserService } from '@services/user.service'
import { testMiddleware, testMiddleware2 } from '@middlewares/user.middleware'

const userService = new UserService()
const userController = new UserController(userService)

export const userRouter: IRouter = {
  prefix: '/users',
  routes: [
    {
      path: '/',
      method: HTTP_METHOD.GET,
      handler: userController.getAllUsers.bind(userController),
      middleware: [testMiddleware, testMiddleware2],
    },
    {
      path: '/:id',
      method: HTTP_METHOD.GET,
      handler: userController.getUserById.bind(userController),
      middleware: [testMiddleware, testMiddleware2],
    },
    {
      path: '/',
      method: HTTP_METHOD.POST,
      handler: userController.createUser.bind(userController),
      middleware: [testMiddleware2],
    },
  ],
}
