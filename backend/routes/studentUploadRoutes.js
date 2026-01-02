import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {uploadStudent} from "../controllers/courseController.js";

const router = express.Router();


// Set up multer
const upload = multer();

router.post("/", upload.single("file"), uploadStudent);


// router.get("/:id", getTopicdata);

export default router;