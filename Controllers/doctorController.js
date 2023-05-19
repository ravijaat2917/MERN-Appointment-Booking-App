import doctorModel from "../Models/doctorModel.js";
import appointmentModel from "../Models/appointmentModel.js";
import userModel from "../Models/userModel.js";

export const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res
      .status(200)
      .send({ success: true, message: "Doctor Data Fetch", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Doctor Details",
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Profile Updated Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Doctor Profile Update Issue", error });
  }
};

export const getDoctorbyid = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Fetched Single Doctor Info Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting Doctor Info", error });
  }
};

export const doctorAppointmentController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Appointments getting successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Appointments",
      error,
    });
  }
};

export const updateStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    user.notification.push({
      type: `appointment-booking-status`,
      message: `Your Appointment Booking is ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Appointment Status",
      error,
    });
  }
};
