
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { createTopic,getTopic,getTopicdata} from "../controllers/courseController.js";
import * as trainerController from "../controllers/trainerController.js";       
const router = express.Router();


// Set up multer
const upload = multer();

router.post("/", trainerController.createTrainer);
router.get("/", trainerController.getTrainers);


export default router;
