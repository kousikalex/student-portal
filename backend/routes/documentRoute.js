import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { postdocument } from "../controllers/courseController.js";

const router = express.Router();

// ES module path settings
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer Storage Setting (Dynamic Folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath;

    if (file.fieldname === "pdf") {
      folderPath = path.join(__dirname, "../uploads/course/pdf");
    } else if (file.fieldname === "video") {
      folderPath = path.join(__dirname, "../uploads/course/videos");
    }

    cb(null, folderPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// multer middleware
const upload = multer({ storage });

// ⬅️ Upload 2 files at once
router.post("/",upload.fields
  ([{ name: "pdf", maxCount: 1 },
    { name: "video", maxCount: 1 },]),
    postdocument);

export default router;
