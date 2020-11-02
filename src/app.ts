import * as express from 'express'

class App {
  private express: express.Application

  public constructor() {
    this.express = express()
  }

  public init(): express.Application {
    return this.express
  }
}

export default new App().init()
