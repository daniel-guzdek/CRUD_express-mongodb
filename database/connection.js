const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const con = await mongoose.connect('mongodb+srv://admin:admin123@cluster0.yyszp.mongodb.net/ProgrammersDB?retryWrites=true&w=majority', {
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