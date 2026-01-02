import mongoose from "mongoose";

const subCourseSchema = new mongoose.Schema({
 course_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course",
  required: true,
},
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  file: {
    type: String, // store file path or filename
  },
}, { timestamps: true });

export default mongoose.model("SubCourse", subCourseSchema);
