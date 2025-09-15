// backend/controllers/userController.js
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

// @desc    Get logged-in user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const sellerId = new mongoose.Types.ObjectId(req.user._id);

    // 1. Calculate Total Earnings
    const earningsPipeline = [
      { $unwind: '$orderItems' }, // Deconstruct the orderItems array
      { $match: { 'orderItems.seller': sellerId } }, // Find items sold by the current user
      { $group: { _id: null, total: { $sum: '$orderItems.price' } } }, // Sum up the prices
    ];
    const earningsResult = await Order.aggregate(earningsPipeline);
    const totalEarnings = earningsResult.length > 0 ? earningsResult[0].total : 0;

    // 2. Calculate Items Rented
    const rentedPipeline = [
      { $unwind: '$orderItems' },
      { $match: { 'orderItems.seller': sellerId } },
      { $count: 'total' },
    ];
    const rentedResult = await Order.aggregate(rentedPipeline);
    const itemsRented = rentedResult.length > 0 ? rentedResult[0].total : 0;

    res.json({
      totalEarnings,
      itemsRented,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      // ✅ THE FIX: Added logic to update bio and avatar
      user.bio = req.body.bio ?? user.bio; // Use ?? to allow empty strings
      user.avatar = req.body.avatar || user.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------- WISHLIST --------------------

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist/:id
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);
    if (user.wishlist.includes(product._id)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(product._id);
    await user.save();

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter((p) => p.toString() !== req.params.id);

    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get wishlist items
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------- REVIEWS --------------------

// @desc    Add review to product
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
