import express from "express";
import Trainer from "../models/Trainer.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body; // password = mobile

  try {
    const trainer = await Trainer.findOne({ email });

    if (!trainer) {
      return res.json({
        success: false,
        message: "Trainer not found",
      });
    }

    // Mobile number check
    if (trainer.phone !== password) {
      return res.json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    // Status check
    if (trainer.status !== "active") {
      return res.json({
        success: false,
        message: "Trainer account inactive",
      });
    }

    res.json({
      success: true,
      user: {
        id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
        role: "trainer",
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
