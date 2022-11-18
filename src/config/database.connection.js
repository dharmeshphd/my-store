const mongoose = require('mongoose');

const databaseConnection = async () => {
  try {
    const mongoURI = `mongodb://localhost:27017/software_co`;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongodb database connected successfully');
  } catch (err) {
    console.log("In case of localhost, make sure you started mongodb instance.")
    console.log("start =>","brew services start mongodb-community@6.0")
    console.log("stop =>","brew services stop mongodb-community@6.0")
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = databaseConnection;
