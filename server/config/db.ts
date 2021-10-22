import {
  Log
} from '../utilities/debug'
import mongoose from 'mongoose'
import * as config from './index'
const uri = `mongodb+srv://${config.mongoUser}:${config.mongoPwd}@cluster0-pdeks.mongodb.net/${config.dbName}?retryWrites=true&w=majority`
const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

  Log.info(`MongoDB Connected: ${conn.connection.host}`)
}

export default connectDB
