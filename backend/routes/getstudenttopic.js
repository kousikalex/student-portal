import express from "express";
import { getTopicsWithSubtopics } from "../controllers/courseController.js";

const router = express.Router();

// ✅ Fetch course by ID
router.get("/:subcourseId", getTopicsWithSubtopics);

export default router;
