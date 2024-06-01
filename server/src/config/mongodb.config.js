import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const MONGO_DB = process.env.MONGO_DB;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URL}${MONGO_DB}`).then(() => console.log(`Connected to MongoDB`));
  } catch (error) {
    console.log(error);
  }
};
