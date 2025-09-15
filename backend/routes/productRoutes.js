import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyListings,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js"; // admin can still be used for other routes
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/my-listings", protect, getMyListings);

router
  .route("/")
  .get(getProducts)
  // ✅ THE FIX: Removed the `admin` middleware from this line
  .post(protect, upload.array("images", 5), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, upload.array("images", 5), updateProduct)
  .delete(protect, deleteProduct);

export default router;
