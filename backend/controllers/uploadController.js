// controllers/uploadController.js
export const uploadSingleImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    image: `/${req.file.path}`, // accessible via /uploads/...
  });
};
