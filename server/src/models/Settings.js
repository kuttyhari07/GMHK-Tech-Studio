import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    websiteName: { type: String, trim: true, default: "GMHK Tech Studio" },
    tagline: { type: String, trim: true, default: "Transforming Ideas into Digital Reality" },
    logo: { type: String, default: "" },
    email: { type: String, trim: true, default: "gmhktechstudio0429@gmail.com" },
    whatsapp: { type: String, trim: true, default: "6380911912" },
    website: { type: String, trim: true, default: "gmhktechstudio.in" },
    location: { type: String, trim: true, default: "Tamil Nadu, India" },
    socialLinks: {
      instagram: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
