import express from "express";
import { getstudentCourse } from "../controllers/courseController.js";

const router = express.Router();

// ✅ Fetch course by ID
router.get("/:courseId", getstudentCourse);

export default router;
