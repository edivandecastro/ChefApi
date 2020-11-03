import * as mongoose from 'mongoose'

export default class Database {

  private configMongoose: Object

  public constructor() {
    mongoose.set('useCreateIndex', true)

    this.configMongoose = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }

  public connectMongoDB(): void {
    mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-hfiub.mongodb.net/chef?retryWrites=true&w=majority', this.configMongoose)
    // mongoose.connect('mongodb://localhost:27017/chef', this.configMongoose);
  }
}
