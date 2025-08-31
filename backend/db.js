const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notiva"; // Replace with your MongoDB URI
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
