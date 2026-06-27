import { Router } from "express";
import {
  createPricing,
  deletePricing,
  getPricing,
  updatePricing,
} from "../controllers/pricingController.js";
import { authorizeAdmin, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getPricing);
router.post("/", protect, authorizeAdmin, createPricing);
router.put("/:id", protect, authorizeAdmin, updatePricing);
router.delete("/:id", protect, authorizeAdmin, deletePricing);

export default router;
