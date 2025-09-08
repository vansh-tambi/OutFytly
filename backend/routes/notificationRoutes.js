import express from "express";
import {
  createNotification,
  getMyNotifications,
  markAsRead,
} from "../controllers/notificationController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.get("/my", protect, getMyNotifications);
router.put("/:id/read", protect, markAsRead);

// Admin route to send system notifications
router.post("/", protect, admin, createNotification);

export default router;
