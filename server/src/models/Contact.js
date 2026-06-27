import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
      maxlength: [80, "Name cannot exceed 80 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      match: [/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number."],
    },
    service: {
      type: String,
      required: [true, "Service is required."],
      trim: true,
      enum: [
        "Static Website",
        "Portfolio Website",
        "Business Website",
        "Landing Page",
        "E-commerce Website",
        "Website Redesign",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [10, "Message must be at least 10 characters."],
      maxlength: [1000, "Message cannot exceed 1000 characters."],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

contactSchema.index({ name: "text", email: "text", phone: "text", service: "text", message: "text" });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
