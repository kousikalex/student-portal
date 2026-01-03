import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import courseRoutes from "./routes/courseRoutes.js";
import subcourseRoutes from "./routes/subcourseRoutes.js";
import Topic from "./routes/topicRoute.js";
import Subtopic from "./routes/subtopic.js";
import Student from "./routes/student.js";
import studentUpload from "./routes/studentUploadRoutes.js";
import dependenceRoute from "./routes/dependenceRoute.js";
import Studentlogin from "./routes/Studentlogin.js";
import GetCourse from "./routes/getCourseRoute.js";
import GetsubCourse from "./routes/getsubCourseRoute.js";
import GetTopic from "./routes/getstudenttopic.js";
import PostDocument from "./routes/documentRoute.js";
import getDocument from "./routes/getdocumentRoute.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import trainerLoginRoute from "./routes/login.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
// const trainerLoginRoute = require("./routes/login.js");

dotenv.config();
const app = express();

// Get current directory path (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to DB
connectDB();

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/subcourse", subcourseRoutes);
app.use("/api/topic", Topic);
app.use("/api/subtopic", Subtopic);
app.use("/api/student", Student);
app.use("/api/studentlogin", Studentlogin);
app.use("/api/getstudentcourse", GetCourse);
app.use("/api/getstudentsubcourse", GetsubCourse);
app.use("/api/getstudenttopic", GetTopic);
app.use("/api/document", PostDocument);
app.use("/api/getdocument", getDocument);
app.use("/api/trainers", trainerRoutes);
app.use("/api/studentUpload", studentUpload);
app.use("/api/trainerlogin",trainerLoginRoute)
app.use("/api/attendance", attendanceRoutes);


// app.use("/subcourse/byCourse/:courseId", dependenceRoute);

// Default route
app.get("/", (req, res) => res.send("API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
