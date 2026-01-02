import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { createCourse, getAllCourses,createsubCourse } from "../controllers/courseController.js";

const router = express.Router();

// get directory path for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/course")); // absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const subcourse = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, path.join(__dirname, "../uploads/subcourse")); // absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const subCourse = multer({ subcourse });

const upload = multer({ storage });

// Routes
router.post("/", upload.single("file"), createCourse);
router.get("/", getAllCourses);

router.post("/subcourse", subCourse.single("file"), createsubCourse);


export default router;
