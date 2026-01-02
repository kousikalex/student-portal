import { log } from "console";
import Course from "../models/Course.js";
import SubCourse from "../models/SubCourse.js";
import Topic from "../models/Topic.js";
import Subtopic from "../models/Subtopic.js";
import Student from "../models/Student.js";
import DocumentModel from "../models/Document.js";
import XLSX from "xlsx";

// ✅ Create course
export const createCourse = async (req, res) => {
  try {
    const { name, duration, description } = req.body;
    const filePath = req.file ? req.file.filename : null;

    const newCourse = new Course({
      name,
      duration,
      description,
      file: filePath,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// subcourse
export const createsubCourse = async (req, res) => {
  //   console.log(req);
  try {
    const { course_id, name, duration, description } = req.body;
    const filePath = req.file ? req.file.filename : null;

    const newCourse = new SubCourse({
      course_id,
      name,
      duration,
      description,
      file: filePath,
    });

    await newCourse.save();
    res.status(201).json({ message: "Sub-Course added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get all subcourses
export const getAllsubCourses = async (req, res) => {
  try {
    const subcourses = await SubCourse.find().populate("course_id", "name");
    res.status(200).json(subcourses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getSubcoursesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const subcourses = await SubCourse.find({ course_id: courseId });
    res.status(200).json(subcourses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { course_id, subcourse_id, name } = req.body;

    // ✅ Basic validation
    if (!subcourse_id || !name) {
      return res
        .status(400)
        .json({ message: "subcourse_id and name are required" });
    }

    // ✅ Create and save the new topic
    const newTopic = new Topic({
      course_id,
      subcourse_id,
      name,
    });

    await newTopic.save();

    res
      .status(201)
      .json({ message: "Topic added successfully!", topic: newTopic });
  } catch (error) {
    console.error("❌ Error creating topic:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get all Topic
export const getTopic = async (req, res) => {
  try {
    const topic = await Topic.find().populate({
      path: "subcourse_id",
      select: "name course_id",
      populate: {
        path: "course_id",
        select: "name", // get the course name inside subcourse
      },
    });
    //

    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Get all Topic
export const getTopicdata = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate(
      "subcourse_id",
      "name"
    );
    // console.log(topic);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json(topic);
  } catch (err) {
    console.error("Error fetching topic:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createsubTopic = async (req, res) => {
  try {
    const { topic_id, name } = req.body;

    if (!topic_id || !name) {
      return res.status(400).json({ message: "All fields required" });
    }

    const subtopic = new Subtopic({ topic_id, name });
    await subtopic.save();

    res
      .status(201)
      .json({ message: "Sub-Topic created successfully", subtopic });
  } catch (error) {
    console.error("Error creating Sub-Topic:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all Subtopics
export const getSubTopics = async (req, res) => {
  try {
    const subtopics = await Subtopic.find().populate({
      path: "topic_id", // populate Topic
      select: "name subcourse_id", // select Topic fields
      populate: {
        // deep populate SubCourse
        path: "subcourse_id",
        select: "name", // only show SubCourse name
      },
    });

    res.status(200).json(subtopics);
  } catch (error) {
    console.error("Error fetching subtopics:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
export const createStudent = async (req, res) => {
  try {
    const {
      course_id,
      name,
      email,
      password,
      phone,
      address,
      emergencyContactName,
      emergencyContactNumber,
      bloodGroup,
    } = req.body;

    // ✅ Validation
    if (!course_id || !name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Course, Name, Email, Password, and Phone are required",
      });
    }

    // ✅ Create student
    const newStudent = new Student({
      course_id,
      name,
      email,
      password,
      phone,
      address,
      emergencyContactName,
      emergencyContactNumber,
      bloodGroup,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student added successfully!",
      student: newStudent,
    });
  } catch (error) {
    console.error("❌ Error creating student:", error.message);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


export const uploadStudent = async (req, res) => {
  try {
    const { course_id } = req.body;

    if (!course_id || !req.file) {
      return res.status(400).json({
        message: "Course and Excel file are required",
      });
    }

    // ✅ Read Excel from memory
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // ✅ Convert rows → student documents
    const students = rows.map((row) => ({
      course_id,
      name: row.name,
      email: row.email,
      password: row.password,
      phone: row.phone,
      address: row.address,
      emergencyContactName: row.emergencyContactName,
      emergencyContactNumber: row.emergencyContactNumber,
      bloodGroup: row.bloodGroup,
    }));

    // ✅ Save directly to MongoDB
    await Student.insertMany(students);

    res.status(201).json({
      message: "Students imported successfully",
      totalInserted: students.length,
    });
  } catch (error) {
    console.error("Excel Import Error:", error);
    res.status(500).json({
      message: "Failed to import students",
      error: error.message,
    });
  }
};
// getStudent

export const getStudent = async (req, res) => {
  try {
    const student = await Student.find().populate("course_id", "name");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const Studentlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔹 Find user by email
    const user = await Student.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // 🔹 Check plain-text password (no bcrypt)
    if (user.password !== password)
      return res.json({ success: false, message: "Invalid password" });

    // 🔹 If valid, send success response
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        courseId: user.course_id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getstudentCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("Fetching course for ID:", courseId);

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getstudentSubCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("Fetching subcourses for course ID:", courseId);

    // ✅ Find all subcourses with matching course_id
    const subcourses = await SubCourse.find({ course_id: courseId });

    if (!subcourses || subcourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcourses found for this course",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subcourses fetched successfully",
      data: subcourses,
    });
  } catch (error) {
    console.error("Error fetching subcourses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTopicsWithSubtopics = async (req, res) => {
  try {
    const { subcourseId } = req.params;

    console.log("Fetching topics for subcourse:", subcourseId);

    // 1️⃣ Fetch topics based on subcourse_id
    const topics = await Topic.find({ subcourse_id: subcourseId });

    if (!topics.length) {
      return res
        .status(404)
        .json({ message: "No topics found for this subcourse" });
    }

    // 2️⃣ For each topic, fetch its subtopics
    const topicsWithSubtopics = await Promise.all(
      topics.map(async (topic) => {
        const subtopics = await Subtopic.find({ topic_id: topic._id }).select(
          "name _id"
        );

        return {
          topic_name: topic.name,
          subtopics: subtopics.map((st) => ({
            _id: st._id,
            name: st.name,
          })),
        };
      })
    );

    res.status(200).json({
      success: true,
      data: topicsWithSubtopics,
    });
  } catch (error) {
    console.error("Error fetching topics with subtopics:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const postdocument = async (req, res) => {
  try {
    const { subtopic_id } = req.body;

    const pdfPath = req.files?.pdf?.[0]?.path || null;
    const videoPath = req.files?.video?.[0]?.path || null;

    if (!subtopic_id) {
      return res.status(400).json({ message: "subtopic_id is required" });
    }

    const data = await DocumentModel.create({
      subtopic_id,
      pdf: pdfPath,
      video: videoPath,
    });

    res.status(201).json({
      success: true,
      message: "Files uploaded successfully",
      data,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getDocument = async (req, res) => {
  try {
    const { subId } = req.params;
    const { type } = req.query;

    const doc = await DocumentModel.findOne({ subtopic_id: subId });

    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: "No document found" });
    }

    const baseURL = "http://localhost:5000";

    let videoUrl = "";
    let pdfUrl = "";

    if (doc.video) {
      videoUrl = doc.video.replace(
        "C:\\Users\\KOUSIK\\Desktop\\student portal\\backend",
        baseURL
      );
    }

    if (doc.pdf) {
      pdfUrl = doc.pdf.replace(
        "C:\\Users\\KOUSIK\\Desktop\\student portal\\backend",
        baseURL
      );
    }

    return res.json({
      success: true,
      videoUrl,
      pdfUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
