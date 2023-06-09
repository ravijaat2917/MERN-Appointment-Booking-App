import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
} from "../Controllers/adminController.js";

const router = express();

router.get("/getAllUsers", authMiddleware, getAllUsersController);

router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

export default router;
