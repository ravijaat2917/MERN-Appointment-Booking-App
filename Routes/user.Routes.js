import express from "express";
import {
  authController,
  loginController,
  applyDoctorController,
  registerController,
} from "../Controllers/userController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

// router Object
const router = express.Router();

// routes
// Login || Post
router.post("/login", loginController);

// Register || Post
router.post("/register", registerController);

// Auth || Post
router.post("/getUserData", authMiddleware, authController);

// Apply Doctor || Post
router.post("/apply-doctor", authMiddleware, applyDoctorController);



export default router;
