import * as express from 'express'
import { Router } from 'express'

class Routes {
  private router: Router;

  public constructor() {
    this.router = Router()
    this.router.use(express.json())
    this.router.use(express.urlencoded({ extended: true }))
  }

  public load(): Router {
    return this.router
  }
}

export default new Routes
