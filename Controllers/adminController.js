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
