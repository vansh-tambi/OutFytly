import Product from "../models/Product.js";

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { title, description, rentalPrice, category, sizes } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : [];
    const product = new Product({
      title,
      description,
      rentalPrice,
      category,
      sizes: sizes ? sizes.split(",") : [],
      images,
      user: req.user._id, // ✅ Correct field name
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    // ... your excellent filtering and pagination logic is unchanged ...

    const products = await Product.find({
      ...keyword,
      ...category,
      ...size,
      ...priceFilter,
    })
      .populate("user", "name email") // ✅ Correct field name
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user.toString() !== req.user._id.toString()) {
      // ✅ Correct field name
      return res.status(401).json({ message: "Not authorized" });
    }
    // ... rest of delete logic is correct ...
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
