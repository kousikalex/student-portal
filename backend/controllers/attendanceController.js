import Attendance from "../models/attendance.js";

export const punchIn = async (req, res) => {
  const { trainerId } = req.body;

  const today = new Date().toISOString().split("T")[0];

  try {
    const existing = await Attendance.findOne({ trainerId, date: today });

    if (existing && existing.punchIn) {
      return res.json({ success: false, message: "Already punched in" });
    }

    const attendance =
      existing ||
      new Attendance({
        trainerId,
        date: today,
      });

    attendance.punchIn = new Date();
    await attendance.save();

    res.json({ success: true, message: "Punch In successful", attendance });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const punchOut = async (req, res) => {
  const { trainerId } = req.body;

  const today = new Date().toISOString().split("T")[0];

  try {
    const attendance = await Attendance.findOne({ trainerId, date: today });

    if (!attendance || !attendance.punchIn) {
      return res.json({ success: false, message: "Punch in first" });
    }

    if (attendance.punchOut) {
      return res.json({ success: false, message: "Already punched out" });
    }

    attendance.punchOut = new Date();
    await attendance.save();

    res.json({ success: true, message: "Punch Out successful", attendance });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
