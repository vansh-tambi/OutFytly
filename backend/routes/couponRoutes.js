import express from "express";
import {
  createCoupon,
  applyCoupon,
  getCoupons,
  deleteCoupon,
} from "../controllers/couponController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes
router.route("/").post(protect, admin, createCoupon).get(protect, admin, getCoupons);
router.route("/:id").delete(protect, admin, deleteCoupon);

// User route
router.post("/apply", protect, applyCoupon);

export default router;
