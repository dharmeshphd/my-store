const mongoose = require('mongoose');

// This is not safe place to store user name and password of database, but i keep it here because ease to explain
user = "admin "
pass = "cAmetbQDODTBN0J4"

const mongo_db_URI = `mongodb+srv://admin:${pass}@learningdb.at8s5s9.mongodb.net/my-shop?retryWrites=true&w=majority`

const databaseConnection = async () => {
  try {
    // const mongoURI = `mongodb://localhost:27017/software_co`;
    await mongoose.connect(mongo_db_URI, {
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
