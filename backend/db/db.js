import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection SUCCESS: ", connection.connection.name);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
