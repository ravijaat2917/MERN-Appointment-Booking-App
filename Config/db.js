import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log(`DataBase Connected Successfully ${mongoose.connection.host}`);
  } catch (error) {
    console.log("MongoDB Server Issue" + error);
  }
};
export default connectDB;
