import { Request, Response, NextFunction } from 'express'
import { TokenValidate } from '../service/HeimdalApi'

class Auth {
  public async verify(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const [ _, token ] = authHeader.split(' ')

    await TokenValidate(token).then((response) => {
      req.params.CurrentUserId = response.data.sub
      return next();
    }, (error) => {
      res.status(401).send({ error: error.response.data.error })
    })
  }
}

export default new Auth
