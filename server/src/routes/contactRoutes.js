import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContacts,
  markContactRead,
} from "../controllers/contactController.js";
import { authorizeAdmin, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", createContact);
router.get("/", protect, authorizeAdmin, getContacts);
router.patch("/:id/read", protect, authorizeAdmin, markContactRead);
router.delete("/:id", protect, authorizeAdmin, deleteContact);

export default router;
