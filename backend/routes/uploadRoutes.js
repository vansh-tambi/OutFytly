import express from "express";
import { upload } from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

// Single image upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

export default router;
