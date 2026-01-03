import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  punchIn: {
    type: Date,
  },
  punchOut: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["PRESENT", "ABSENT"],
    default: "PRESENT",
  },
});

export default mongoose.model("Attendance", attendanceSchema);
