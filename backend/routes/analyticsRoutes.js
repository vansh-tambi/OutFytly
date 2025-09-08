import express from "express";
import { getDashboardStats, getSalesByMonth } from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, admin, getDashboardStats);
router.get("/sales", protect, admin, getSalesByMonth);

export default router;
