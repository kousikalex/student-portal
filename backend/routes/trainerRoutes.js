import express from "express";
import multer from "multer";
import * as trainerController from "../controllers/trainerController.js";

const router = express.Router();
const upload = multer();

// Trainer login
router.post("/login", trainerController.trainerLogin);

// Trainer CRUD
router.post("/", trainerController.createTrainer);
router.get("/", trainerController.getTrainers);

export default router;
