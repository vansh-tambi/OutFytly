import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addProductReview,
  getDashboardStats
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Profile
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get('/dashboard-stats', protect, getDashboardStats);

// Wishlist
router.post("/wishlist/:id", protect, addToWishlist);
router.delete("/wishlist/:id", protect, removeFromWishlist);
router.get("/wishlist", protect, getWishlist);

// Reviews (Product)
router.post("/reviews/:id", protect, addProductReview);

export default router;
