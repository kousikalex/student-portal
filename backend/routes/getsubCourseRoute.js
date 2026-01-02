import express from "express";
import { getstudentSubCourse } from "../controllers/courseController.js";

const router = express.Router();

// ✅ Fetch course by ID
router.get("/:courseId", getstudentSubCourse);

export default router;
