import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {createsubCourse,getAllsubCourses,getSubcoursesByCourse} from "../controllers/courseController.js";

const router = express.Router();

// get directory path for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const subcourse = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, path.join(__dirname, "../uploads/subcourse")); // absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: subcourse }); 



router.post("/", upload.single("file"), createsubCourse);
router.get("/", getAllsubCourses);
router.get("/byCourse/:courseId", getSubcoursesByCourse);




export default router;
