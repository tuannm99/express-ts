import {
  Express,
  Router as ExpressRouter,
  Request,
  Response,
  NextFunction,
} from 'express'

// all expressjs http type
export enum HTTP_METHOD {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  ALL = 'all',
  OPTIONS = 'options',
  HEAD = 'head',
}

export interface IRoute {
  path: string
  method: HTTP_METHOD
  handler: (req: Request, res: Response, next: NextFunction) => void
  middleware?: Array<(req: Request, res: Response, next: NextFunction) => void>
}

export interface IRouter {
  routes: Array<IRoute>
  prefix?: string
}

export class Application {
  constructor(private readonly app: Express) {}

  public current(): Express {
    return this.app
  }

  public useMiddlware(middleware: Array<any>) {
    // fix type, too lazy
    this.app.use([...middleware])
  }

  public useRouter(router: IRouter): void {
    const expressRouter = ExpressRouter()
    router.routes.forEach((route) => {
      if (route.middleware) {
        expressRouter[route.method](route.path, route.middleware, route.handler)
      } else {
        expressRouter[route.method](route.path, route.handler)
      }
    })
    this.app.use(router.prefix || '/', expressRouter)
  }

  public start(port: number, callback: (() => void) | null = null) {
    if (callback) {
      this.app.listen(port, callback)
      return
    }

    this.app.listen(port, () => {
      console.log(`Application running on port ${port}`)
    })
  }
}

export const ApplicationFactory = (
  application: Application,
  routers: Array<IRouter>,
  middlewares: Array<any>
) => {
  routers.forEach((router) => {
    application.useRouter(router)
  })
  // use middleware here
  application.useMiddlware(middlewares)
  // TODO: need gracefully shutdown, global error handler
  //
  application.start(3000)
}
