import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    emergencyContactName: {
      type: String,
    },

    emergencyContactNumber: {
      type: String,
    },

    bloodGroup: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Students", studentSchema);
