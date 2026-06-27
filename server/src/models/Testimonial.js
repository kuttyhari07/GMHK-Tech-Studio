import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address."],
    },
    business: { type: String, trim: true, default: "", maxlength: 120 },
    project: { type: String, required: true, trim: true, maxlength: 120 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 1200 },
    photo: { type: String, default: "" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

testimonialSchema.index({ name: "text", business: "text", project: "text", message: "text" });

export default mongoose.model("Testimonial", testimonialSchema);
