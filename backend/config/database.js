const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to mongoDB");
  } catch (error) {
    console.log(`Connection to mongoDB failed:`, error.message);
  }
}
module.exports = connectDB;
