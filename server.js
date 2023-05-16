import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/user.Routes.js";
import adminRoutes from "./Routes/admin.Routes.js";
import doctorRoutes from "./Routes/doctor.Routes.js";

// Rest object
const app = express();

// Middlewares
dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Database Connection
connectDB(process.env.DATABASE_URL);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

const PORT = process.env.PORT;
// Listen Port
app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
