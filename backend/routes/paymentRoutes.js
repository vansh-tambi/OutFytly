import express from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Razorpay order
router.post("/order", protect, createPaymentOrder);

// ✅ Verify Razorpay payment
router.post("/verify", protect, verifyPayment);

export default router;
