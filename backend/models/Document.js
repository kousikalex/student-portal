import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    subtopic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic",
      required: true,
    },

    pdf: { type: String, default: null },
    video: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Document", DocumentSchema);
