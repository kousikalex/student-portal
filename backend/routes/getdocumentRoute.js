import express from "express";
import { getDocument } from "../controllers/courseController.js";

const router = express.Router();

router.get("/:subId", getDocument);

export default router;
