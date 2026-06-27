import { Router } from "express";
import {
  deleteTestimonial,
  getApprovedTestimonials,
  getTestimonials,
  setTestimonialStatus,
  submitTestimonial,
  updateTestimonial,
} from "../controllers/testimonialController.js";
import { authorizeAdmin, protect } from "../middleware/authMiddleware.js";
import { uploadImage } from "../middleware/uploadMiddleware.js";

const router = Router();

router.get("/approved", getApprovedTestimonials);
router.post("/", uploadImage.single("photo"), submitTestimonial);
router.get("/", protect, authorizeAdmin, getTestimonials);
router.put("/:id", protect, authorizeAdmin, uploadImage.single("photo"), updateTestimonial);
router.delete("/:id", protect, authorizeAdmin, deleteTestimonial);
router.patch("/:id/approve", protect, authorizeAdmin, setTestimonialStatus("Approved"));
router.patch("/:id/reject", protect, authorizeAdmin, setTestimonialStatus("Rejected"));

export default router;
