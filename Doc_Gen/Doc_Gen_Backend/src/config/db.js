import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection Successfully");
  } catch (error) {
    console.log("Database Connection Failed", error.message);
    process.exit(1);
  }
};

export default dbConnection;
