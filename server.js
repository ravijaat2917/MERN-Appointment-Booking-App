import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/user.Routes.js";
import adminRoutes from "./Routes/admin.Routes.js";
import doctorRoutes from "./Routes/doctor.Routes.js";
import path from 'path';
import { fileURLToPath } from "url";

// Rest object
const app = express();

// Middlewares
dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Database Connection
connectDB(process.env.DATABASE_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(path.join(__dirname));
app.use(express.static(path.join(__dirname,"./client/build")));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

const PORT = process.env.PORT;
// Listen Port
app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
