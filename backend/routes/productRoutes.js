// backend/routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyListings,
  createProductReview, // ✅ 1. Import createProductReview
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/my-listings", protect, getMyListings);

router
  .route("/")
  .get(getProducts)
  .post(protect, upload.array("images", 5), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, upload.array("images", 5), updateProduct)
  .delete(protect, deleteProduct);

// ✅ 2. ADD THIS ROUTE FOR CREATING REVIEWS
router.post("/:id/reviews", protect, createProductReview);

export default router;