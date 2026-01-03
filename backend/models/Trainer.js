import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    specialist: String,
    emergencyContactPerson: String,
    emergencyContactNumber: String,
    bloodGroup: String,

    bankName: String,
    accountNumber: String,
    ifscCode: String,
    branch: String,

    address: String,
    status: { type: String, default: "active" },
  role: { type: String, default: "trainer" },
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;   // ✅ VERY IMPORTANT
