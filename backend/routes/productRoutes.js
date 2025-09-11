import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyListings, // Make sure this is imported
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// --- THE FIX ---
// Define the specific '/my-listings' route first.
router.get("/my-listings", protect, getMyListings);

// Now, define the routes for the base '/' path.
router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.array("images", 5), createProduct);

// Routes for '/:id' remain the same.
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.array("images", 5), updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
