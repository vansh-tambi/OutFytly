import express from "express";
import {
  addReview,
  getReviews,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:productId", protect, addReview);   // Add review
router.get("/:productId", getReviews);            // Get reviews
router.delete("/:id", protect, deleteReview);     // Delete review

export default router;
