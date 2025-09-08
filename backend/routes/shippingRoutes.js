import express from "express";
import {
  addAddress,
  getAddresses,
  deleteAddress,
  updateOrderDelivery,
} from "../controllers/shippingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addAddress);
router.get("/", protect, getAddresses);
router.delete("/:id", protect, deleteAddress);

// Admin: update delivery
router.put("/orders/:id/deliver", protect, admin, updateOrderDelivery);

export default router;
