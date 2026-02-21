/**
 * Database Configuration
 * Handles MongoDB connection using Mongoose
 */

const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the connection string from environment variables
 * @throws {Error} If connection fails
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    // Throw error instead of exiting process so serverless platforms
    // (Vercel, AWS Lambda, etc.) don't terminate the entire runtime.
    throw error;
  }
};

module.exports = connectDB;
