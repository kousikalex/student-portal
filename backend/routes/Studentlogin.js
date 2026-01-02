import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { Studentlogin} from "../controllers/courseController.js";

const router = express.Router();


// Set up multer
const upload = multer();

router.post("/", upload.none(), Studentlogin); // ✅ parse FormData fields
// router.get("/", getSubTopics );

// router.get("/:id", getTopicdata);

export default router;