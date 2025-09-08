import express from "express";
import {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  deleteProduct,
  getStats,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, admin, getAllUsers);
router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id", protect, admin, updateOrderStatus);
router.delete("/products/:id", protect, admin, deleteProduct);
router.get("/stats", protect, admin, getStats);

export default router;
