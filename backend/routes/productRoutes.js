import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // ⬅️ import multer middleware

const router = express.Router();

// ✅ Get all products | Create new product with image upload
router
  .route("/")
  .get(getProducts)
  .post(protect, upload.array("images", 4), createProduct); // max 4 images

// ✅ Get single product | Update product | Delete product
router
  .route("/:id")
  .get(getProductById)
  .put(protect, upload.array("images", 4), updateProduct) // allow updating images too
  .delete(protect, deleteProduct);

export default router;
