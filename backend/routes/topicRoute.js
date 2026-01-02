import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { createTopic,getTopic,getTopicdata} from "../controllers/courseController.js";

const router = express.Router();


// Set up multer
const upload = multer();

router.post("/", upload.none(), createTopic); // ✅ parse FormData fields
router.get("/", getTopic);

router.get("/:id", getTopicdata);

export default router;