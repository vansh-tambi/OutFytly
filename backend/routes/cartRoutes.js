import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateItemQuantity,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

// ... imports
const router = express.Router();

router
  .route("/")
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

// ✅ ADD THIS ROUTE for updating and removing single items
router
  .route("/:itemId")
  .put(protect, updateItemQuantity) // Add this for quantity changes
  .delete(protect, removeFromCart);

export default router;
