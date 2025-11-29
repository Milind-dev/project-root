import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
  } catch(error) {
    console.error(`🔴 MongoDB Error: ${error.message}`);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;
