import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { getSubTopics,createsubTopic} from "../controllers/courseController.js";

const router = express.Router();


// Set up multer
const upload = multer();

router.post("/", upload.none(), createsubTopic); // ✅ parse FormData fields
router.get("/", getSubTopics );

// router.get("/:id", getTopicdata);

export default router;