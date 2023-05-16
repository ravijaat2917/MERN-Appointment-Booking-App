import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { getDoctorInfoController } from "../Controllers/doctorController.js";

const router = express.Router();

// get single doxtor
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

export default router;
