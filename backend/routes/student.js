import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { getStudent,createStudent} from "../controllers/courseController.js";

const router = express.Router();


// Set up multer
const upload = multer();

router.post("/", upload.none(), createStudent); // ✅ parse FormData fields
router.get("/", getStudent );

// router.get("/:id", getTopicdata);

export default router;