const mongoose = require("mongoose");
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("DB Connected");
  } catch (error) {
    console.log(`DB is not connected: Error: ${error}`);
  }
}

module.exports = {connectDB};
