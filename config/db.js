const mongoose = require('mongoose')
const config = require('./index')
const connectDB = async () => {
  const conn = await mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })

  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB
