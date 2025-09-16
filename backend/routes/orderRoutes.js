import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// Admin routes
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
