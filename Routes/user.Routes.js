import express from "express";
import {
  authController,
  loginController,
  applyDoctorController,
  registerController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  userAppointmentController,
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

router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// book appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// Appointment List
router.get('/user-appointments', authMiddleware, userAppointmentController);

export default router;
