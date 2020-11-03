import * as express from 'express'
import Database from './config/database'

class App {
  private express: express.Application

  public constructor() {
    this.express = express()
    this.database()
  }

  public init(): express.Application {
    return this.express
  }

  private database(): void {
    const database = new Database()
    database.connectMongoDB()
  }
}

export default new App().init()
