import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
 topic_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Topic",
  required: true,
},
  name: {
    type: String,
    required: true,
  },
 
}, { timestamps: true });

export default mongoose.model("subtopics", topicSchema);
