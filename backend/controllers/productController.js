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
      sizes: sizes ? sizes.split(",") : [], // "S,M,L" → ["S","M","L"]
      images,
      createdBy: req.user._id, // ✅ consistent field
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products (with search, filter, sort, pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? { title: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const size = req.query.size ? { sizes: req.query.size } : {};
    const priceFilter =
      req.query.minPrice && req.query.maxPrice
        ? {
            rentalPrice: {
              $gte: Number(req.query.minPrice),
              $lte: Number(req.query.maxPrice),
            },
          }
        : {};

    let sortOption = {};
    if (req.query.sort === "price_asc") sortOption = { rentalPrice: 1 };
    else if (req.query.sort === "price_desc") sortOption = { rentalPrice: -1 };
    else if (req.query.sort === "newest") sortOption = { createdAt: -1 };

    const count = await Product.countDocuments({
      ...keyword,
      ...category,
      ...size,
      ...priceFilter,
    });

    const products = await Product.find({
      ...keyword,
      ...category,
      ...size,
      ...priceFilter,
    })
      .populate("createdBy", "name email")
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

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
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

    // ✅ Check ownership (or admin later)
    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path);
    }

    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
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

    if (product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
