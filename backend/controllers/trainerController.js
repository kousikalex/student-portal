// import Trainer from "../models/Trainer.js";
import Trainer from "../models/Trainer.js";


// ✅ Create trainer
export const createTrainer = async (req, res) => {
   try {
    const trainer = new Trainer(req.body);
    await trainer.save();

    res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: trainer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Trainers fetched successfully",
      data: trainers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const trainerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const trainer = await Trainer.findOne({ email });

    if (!trainer) {
      return res.json({ success: false, message: "Trainer not found" });
    }

    if (trainer.phone !== password) {
      return res.json({ success: false, message: "Invalid mobile number" });
    }

    if (trainer.status !== "active") {
      return res.json({ success: false, message: "Trainer inactive" });
    }

    res.json({
      success: true,
      user: {
        id: trainer._id,
        name: trainer.name,
        email: trainer.email,
        role: "trainer",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
