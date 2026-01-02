import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
 subcourse_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "SubCourse",
  required: true,
},
course_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Course",
  required: true,
},
  name: {
    type: String,
    required: true,
  },
 
}, { timestamps: true });

export default mongoose.model("Topic", topicSchema);
