import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true, maxlength: 1200 },
    resultText: { type: String, required: true, trim: true, maxlength: 500 },
    image: { type: String, default: "" },
    liveLink: { type: String, trim: true, default: "" },
    githubLink: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["active", "inactive", "draft", "Published", "Draft"],
      default: "active",
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

workSchema.index({ title: "text", category: "text", description: "text" });

export default mongoose.model("Work", workSchema);
