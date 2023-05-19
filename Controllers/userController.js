import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../Models/doctorModel.js";
import appointmentModel from "../Models/appointmentModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(200)
      .send({ success: true, message: "Registeration Successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Register Controller : ${error.message}`,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ status: false, message: "Invalid Email or Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ success: true, message: "Login Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Login Controller : ${error.message}`,
    });
  }
};

export const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User Not Found" });
    } else {
      return res.status(200).send({
        success: true,
        message: "User Authenticated",
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Authentication Error", error });
  }
};

export const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "Apply-Doctor-Request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    const ID = adminUser._id;
    await userModel.findByIdAndUpdate(ID, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro While appling for Doctor",
      error,
    });
  }
};

export const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updateUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as Read",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error In Notification", error });
  }
};

export const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // user.notification = [];
    user.seennotification = [];
    const updateUser = await user.save();
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted Successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Unable to delete", error });
  }
};

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "Approved" });
    res.status(200).send({
      success: true,
      message: "Doctors Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while fetching Doctors", error });
  }
};

export const bookAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = await appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-Appointment-Request",
      message: `New Appointment Request From ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "Appointment Book Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while book appointment" });
  }
};

export const userAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res
      .status(200)
      .send({
        success: true,
        message: "Users Appointments Fetch Successfully",
        data: appointments,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        success: false,
        message: "Error in getting appointments",
        error,
      });
  }
};
