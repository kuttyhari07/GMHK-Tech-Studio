import { Router } from "express";
import {
  createWork,
  deleteWork,
  getWorks,
  updateWork,
} from "../controllers/workController.js";
import { authorizeAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

router.get("/", getWorks);
router.post("/", protect, authorizeAdmin, uploadImage.single("image"), createWork);
router.put("/:id", protect, authorizeAdmin, uploadImage.single("image"), updateWork);
router.delete("/:id", protect, authorizeAdmin, deleteWork);

export default router;
