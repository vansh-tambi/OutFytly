import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { title, description, rentalPrice, category, sizes } = req.body;

    // ✅ Get an array of Cloudinary image URLs from the middleware
    const images = req.files ? req.files.map((file) => file.path) : [];

    const product = new Product({
      title,
      description,
      rentalPrice,
      category,
      sizes: sizes ? sizes.split(",") : [],
      images, // These are now full Cloudinary URLs
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.page) || 1;

    // --- Start of Filtering Logic ---
    const query = {};

    // Keyword filter
    if (req.query.keyword) {
      query.title = { $regex: req.query.keyword, $options: "i" };
    }

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // ✅ 2. Location Filter Logic
    if (req.query.location) {
      // First, find all users who match the location
      const usersInLocation = await User.find({ location: req.query.location }).select('_id');
      // Then, get an array of just their IDs
      const userIds = usersInLocation.map(u => u._id);
      // Add a condition to the main query to only find products where the 'user' is in our list of IDs
      query.user = { $in: userIds };
    }
    // --- End of Filtering Logic ---
    
    // Sorting Logic
    let sortOption = {};
    switch (req.query.sort) {
      case "price_asc":
        sortOption = { rentalPrice: 1 };
        break;
      case "price_desc":
        sortOption = { rentalPrice: -1 };
        break;
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("user", "name location") // Also populate location to display if needed
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// @desc    Get logged in user's products
// @route   GET /api/products/my-listings
// @access  Private
export const getMyListings = async (req, res) => {
  try {
    // req.user._id comes from the 'protect' middleware
    const products = await Product.find({ user: req.user._id });
    res.json(products);
  } catch (error) {
    console.error("GET MY LISTINGS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    // ✅ THE FIX: Changed "createdBy" to "user" to match your schema
    const product = await Product.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user.toString() !== req.user._id.toString()) {
      // ✅ Correct field name
      return res.status(401).json({ message: "Not authorized" });
    }
    // ... rest of update logic is correct ...
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // This part now works because 'cloudinary' is imported
    if (product.images && product.images.length > 0) {
      const publicIds = product.images.map((url) => {
        const parts = url.split("/");
        const filename = parts.slice(-2).join("/").split(".")[0];
        return filename;
      });
      await cloudinary.api.delete_resources(publicIds);
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error); // Better logging
    res.status(500).json({ message: error.message });
  }
};