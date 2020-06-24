const mongoose = require('mongoose')
const config = require('./index')
const uri = `mongodb+srv://${config.mongoUser}:${config.mongoPwd}@cluster0-pdeks.mongodb.net/${config.dbName}?retryWrites=true&w=majority`
const connectDB = async () => {
  const conn = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB
