require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB URI
// "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath="C:\data\db"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to Mongo successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

module.exports = connectToMongo;
