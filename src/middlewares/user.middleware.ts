import { NextFunction, Request, Response } from 'express'

export const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hit test middleware')
  next()
}

export const testMiddleware2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hit test middleware2')
  next()
}
