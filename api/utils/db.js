// const mongoose = require("mongoose");
import mongoose from "mongoose";
async function ConnectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{ bufferCommands: false });
    console.log(`MongoDB Connected Successfully at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in Connecting to DB :${error}`);
  }
}

// module.exports = ConnectDB;
export default ConnectDB;
