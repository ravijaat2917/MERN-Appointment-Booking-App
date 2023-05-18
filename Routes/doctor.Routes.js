import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { getDoctorInfoController, updateProfileController } from "../Controllers/doctorController.js";

const router = express.Router();

// get single doxtor
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//  Post update Profile
router.post('/updateProfile' , authMiddleware  ,updateProfileController)

export default router;
