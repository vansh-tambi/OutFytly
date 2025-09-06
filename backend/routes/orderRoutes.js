import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getMyOrders);

export default router;
