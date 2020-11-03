import * as express from 'express'
import * as cors from 'cors'
import Database from './config/database'
import Routes from './config/routes'

class App {
  private express: express.Application

  public constructor() {
    this.express = express()
    this.database()
    this.middlewares()
  }

  public init(): express.Application {
    return this.express
  }

  private database(): void {
    const database = new Database()
    database.connectMongoDB()
  }

  private middlewares(): void {
    this.express.use(cors())
  }

  private routes(): void {
    this.express.use('/chef', Routes.load())
  }
}

export default new App().init()
