import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  doctorAppointmentController,
  getDoctorInfoController,
  getDoctorbyid,
  updateProfileController,
  updateStatusController,
} from "../Controllers/doctorController.js";

const router = express.Router();

// get single doxtor
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//  Post update Profile
router.post("/updateProfile", authMiddleware, updateProfileController);

// Get Single Doctor Info
router.post("/getDoctorById", authMiddleware, getDoctorbyid);

// get Appointments
router.get("/doctor-appointments", authMiddleware, doctorAppointmentController);

// update appointment status
router.post('/update-status', authMiddleware, updateStatusController);

export default router;
