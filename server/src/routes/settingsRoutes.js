import { Router } from "express";
import { getPublicSettings, updateSettings } from "../controllers/settingsController.js";
import { authorizeAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

router.get("/", getPublicSettings);
router.put("/", protect, authorizeAdmin, uploadImage.single("logo"), updateSettings);

export default router;
