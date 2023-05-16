import doctorModel from "../Models/doctorModel.js";
import userModel from "../Models/userModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Users Data List",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, messsage: "Error in geting Users", error });
  }
};
export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "All Doctors List",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, messsage: "Error in geting Doctors", error });
  }
};

export const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "Doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor === "Approved" ? true : false;
    await user.save();
    res
      .status(201)
      .send({ success: true, message: "Account Status Updated", data: doctor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Approve Doctor", error });
  }
};
