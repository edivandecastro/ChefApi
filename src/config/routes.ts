import * as express from 'express'
import { Router } from 'express'
import Auth from '../middlewares/Auth'
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
    this.router.post('/menus', Auth.verify, MenuController.create)
    this.router.get('/menus/:code', Auth.verify, MenuController.show)
    this.router.put('/menus/:id', Auth.verify, MenuController.update)
    this.router.delete('/menus/:id', Auth.verify, MenuController.destroy)
    this.router.get('/menus', Auth.verify, MenuController.all)
  }
}

export default new Routes
