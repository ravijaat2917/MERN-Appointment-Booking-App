import doctorModel from "../Models/doctorModel.js";

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
    res
      .status(201)
      .send({
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
