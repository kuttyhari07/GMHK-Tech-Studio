import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authorizeAdmin, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, authorizeAdmin, getDashboard);

export default router;
