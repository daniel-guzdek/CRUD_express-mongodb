const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
  try {
    const con = await mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  })
    console.log(`MongoDB connected : ${con.connection.host}`);
  }catch(err){
    console.log(err);
    process.exit(1);
    // 1 znaczy true
  }
}

module.exports = connectDB