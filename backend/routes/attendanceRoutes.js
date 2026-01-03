import express from "express";
import Attendance from "../models/attendance.js";
import { punchIn, punchOut } from "../controllers/attendanceController.js";

const router = express.Router();

/* ================= PUNCH IN ================= */
router.post("/punch-in", punchIn);

/* ================= PUNCH OUT ================= */
router.post("/punch-out", punchOut);

/* ================= TODAY ATTENDANCE (MUST BE ABOVE MONTH ROUTE) ================= */
router.get("/today/:trainerId", async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const record = await Attendance.findOne({
      trainerId: req.params.trainerId,
      date: { $gte: start, $lte: end },
    });

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch today attendance" });
  }
});


/* ================= MONTHLY ATTENDANCE ================= */
router.get("/:trainerId/:month/:year", async (req, res) => {
  try {
    const { trainerId, month, year } = req.params;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const records = await Attendance.find({
      trainerId,
      date: { $gte: startDate, $lte: endDate },
    });

    const calendarData = {};

    records.forEach((rec) => {
      const day = new Date(rec.date).getDate();

      calendarData[day] = {
        punchIn: rec.punchIn || "-",
        punchOut: rec.punchOut || "-",
        hours: rec.hours || "0h",
      };
    });

    res.json(calendarData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Attendance fetch failed" });
  }
});

export default router;
