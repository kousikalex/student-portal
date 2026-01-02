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
