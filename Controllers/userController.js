import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      return res
        .status(200)
        .send({
          success: true,
          message: "User Authenticated",
          data: { name: user.name, email: user.email },
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Authentication Error", error });
  }
};
