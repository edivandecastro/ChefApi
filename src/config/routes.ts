import * as express from 'express'
import { Router } from 'express'
import MenuController from '../controllers/MenuController'

class Routes {
  private router: Router;

  public constructor() {
    this.router = Router()
    this.router.use(express.json())
    this.router.use(express.urlencoded({ extended: true }))
  }

  public load(): Router {
    this.loadRoutesForMenus()
    return this.router
  }

  public loadRoutesForMenus() {
    this.router.post('/menus', MenuController.create)
    this.router.get('/menus/:code', MenuController.show)
    this.router.put('/menus/:id', MenuController.update)
    this.router.delete('/menus/:id', MenuController.destroy)
    this.router.get('/menus', MenuController.all)
  }
}

export default new Routes
