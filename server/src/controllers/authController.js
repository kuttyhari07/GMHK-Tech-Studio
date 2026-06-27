import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const signToken = (admin) =>
  jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

const publicAdmin = (admin) => ({
  id: admin._id,
  name: admin.name,
  email: admin.email,
  role: admin.role,
});

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: String(email).toLowerCase().trim() }).select("+password");

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid admin credentials." });
    }

    res.json({
      success: true,
      message: "Login successful.",
      token: signToken(admin),
      admin: publicAdmin(admin),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => {
  res.json({ success: true, admin: publicAdmin(req.admin) });
};

export const updateAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    admin.name = req.body.name?.trim() || admin.name;
    admin.email = req.body.email?.trim().toLowerCase() || admin.email;
    await admin.save();

    res.json({ success: true, message: "Profile updated.", admin: publicAdmin(admin) });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Current password and a new password of at least 8 characters are required.",
      });
    }

    const admin = await Admin.findById(req.admin._id).select("+password");

    if (!(await admin.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    next(error);
  }
};
