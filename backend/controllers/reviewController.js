import Review from "../models/Review.js";
import Product from "../models/Product.js";

// @desc    Add a review
// @route   POST /api/reviews/:productId
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({ user: req.user._id, product: req.params.id });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = new Review({
      rating,
      comment,
      user: req.user._id,
      product: req.params.id,
    });

    await review.save();

    // Update the product's reviews and average rating
    const reviews = await Review.find({ product: req.params.id });
    product.reviews = reviews.map(r => r._id);
    product.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name email"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete review (user or admin)
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (
      review.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await review.deleteOne();

    // Recalculate product rating
    const product = await Product.findById(review.product);
    const reviews = await Review.find({ product: product._id });

    product.averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    product.reviews = reviews.map((r) => r._id);
    await product.save();

    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
