import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      required: [true, "First Name is required"],
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experiance: {
      type: String,
      required: true,
    },
    feePerConsultant: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctor", doctorSchema);

export default doctorModel;
