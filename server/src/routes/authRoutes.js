import { Router } from "express";
import {
  changePassword,
  getMe,
  loginAdmin,
  updateAdminProfile,
} from "../controllers/authController.js";
import { authorizeAdmin, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", protect, authorizeAdmin, getMe);
router.put("/profile", protect, authorizeAdmin, updateAdminProfile);
router.patch("/password", protect, authorizeAdmin, changePassword);

export default router;
