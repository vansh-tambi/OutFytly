// @desc    Upload a single image and return its path
// @route   POST /api/upload
// @access  Private (handled by middleware in the route)
export const uploadImage = (req, res) => {
  if (req.file) {
    res.status(201).json({
      message: "Image uploaded successfully",
      path: `uploads/${req.file.filename}`, // ✅ relative path
    });
  } else {
    res.status(400).json({ message: "No file was uploaded" });
  }
};
