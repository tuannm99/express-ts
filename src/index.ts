import { Application, ApplicationFactory } from '@libs/application'
import express, { Express } from 'express'
import { userRouter } from 'routes/user.route'
import Helmet from 'helmet'

///////////////////////
const app: Express = express()
// other configuration here
const helmet = Helmet()

const application = new Application(app)
const routers = [userRouter]
const middlewares = [helmet]

ApplicationFactory(application, routers, middlewares)
